const fetch = require('isomorphic-fetch')
const vm = require('vm')
const assert = require('assert')
const arrayToHeaders = require('../utils/arrayToHeaders')
const getSettings = require('../models/getSettings')
const Scout = require('../models/Scout')

function isNowInWork(workTime) {
  if (!(workTime && workTime.length)) {
    return true
  }

  function compare(a, b) {
    for (let i = 0; i < 3; i += 1) {
      if (a[i] !== b[i]) {
        return Math.sign(a[i] - b[i])
      }
    }
    return 0
  }

  const time = new Date()
  const timeArray = [
    time.getDay(),
    time.getHours(),
    time.getMinutes(),
  ]

  return workTime.some((range) => {
    if (compare(range[0], range[1]) <= 0) {
      return compare(range[0], timeArray) <= 0 &&
             compare(timeArray, range[1]) < 0
    }
    return compare(range[1], timeArray) <= 0 ||
           compare(timeArray, range[0]) < 0
  })
}

function alert(scout, err) {
  if (scout.errors === scout.tolerance && scout.recipients.length) {
    getSettings().then((settings) => {
      if (settings.alertURL) {
        fetch(settings.alertURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipients: scout.recipients,
            name: scout.name,
            errMessage: err.message,
            detail: '',
          }),
        })
      }
    })
  }
}

function patrol(scout) {
  if (scout.nextPatrol > 0) {
    scout.nextPatrol -= 1
    return
  }

  scout.nextPatrol = scout.interval - 1

  if (!isNowInWork(scout.workTime)) {
    Scout.findByIdAndUpdate(scout._id, {
      $push: { snapshots: {
        status: 'Idle',
      } },
    }).exec()
    return
  }

  let statusCode
  let responseTime
  let body
  const start = Date.now()
  fetch(scout.URL, {
    method: scout.method,
    headers: arrayToHeaders(scout.headers),
    body: scout.body,
  })
  .then((res) => {
    statusCode = res.status
    return res[scout.readType]()
  })
  .then((_body) => {
    responseTime = Date.now() - start
    body = _body
    scout.script.runInNewContext({
      assert,
      statusCode,
      responseTime,
      body,
      console: { log() { } },
    })

    Scout.findByIdAndUpdate(scout._id, {
      $push: { snapshots: {
        status: 'OK',
        statusCode,
        responseTime,
      } },
    }).exec()
    scout.errors = 0
  })
  .catch((err) => {
    Scout.findByIdAndUpdate(scout._id, {
      $push: { snapshots: {
        status: 'Error',
        statusCode,
        responseTime,
        errMessage: err.message,
        body,
      } },
    }).exec()
    .catch(console.log.bind(console))

    alert(scout, err)
    scout.errors += 1
  })
}

let scouts
function update(result) {
  const legacy = {}
  if (scouts) {
    scouts.forEach((scout) => {
      legacy[scout._id] = {
        nextPatrolRatio: scout.nextPatrol / scout.interval,
        errors: scout.errors,
      }
    })
  }

  scouts = result
  scouts.forEach((scout) => {
    if (legacy[scout._id]) {
      const { nextPatrolRatio, errors } = legacy[scout._id]
      scout.nextPatrol = Math.floor(nextPatrolRatio * scout.interval)
      scout.errors = errors
    } else {
      scout.nextPatrol = Math.floor(Math.random() * scout.interval)
      scout.errors = 0
    }
    scout.script = new vm.Script(scout.testCase)
  })
}

function refresh() {
  return Scout.find().select({
    snapshots: 0,
  }).lean().then(update)
}

function patrolAll() {
  const p = scouts ? Promise.resolve() : refresh()
  p.then(() => {
    setTimeout(() => {
      scouts.forEach(patrol)
      patrolAll()
    }, 60000)
  })
}

exports.refresh = refresh
exports.patrolAll = patrolAll
