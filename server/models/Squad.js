const fetch = require('isomorphic-fetch')
const vm = require('vm')
const assert = require('assert')
const arrayToHeaders = require('../utils/arrayToHeaders')
const getSettings = require('./getSettings')
const Scout = require('./Scout')

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

const timeouts = {}
const scoutMap = {}

function alert(scout, snapshot) {
  if (scout.errors === scout.tolerance && scout.recipients.length) {
    getSettings().then((settings) => {
      if (settings.alertURL) {
        fetch(settings.alertURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.assign({
            recipients: scout.recipients,
            name: scout.name,
            URL: scout.URL,
            readType: scout.readType,
            testCase: scout.testCase,
            now: Date.now(),
          }, snapshot)),
        })
      }
    })
  }
}

function patrol(scout) {
  timeouts[scout._id] = setTimeout(scout.patrol, scout.interval * 60 * 1000)

  if (!isNowInWork(scout.workTime)) {
    Scout.findByIdAndUpdate(scout._id, {
      $push: { snapshots: { status: 'Idle' } },
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
    return res.text()
  })
  .then((_body) => {
    const isJSON = scout.readType === 'json'
    responseTime = Date.now() - start
    body = _body
    scout.script.runInNewContext({
      assert,
      statusCode,
      responseTime,
      body: isJSON ? JSON.parse(body) : body,
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
    const snapshot = {
      status: 'Error',
      statusCode,
      responseTime,
      errName: err.name,
      errMessage: err.message,
    }
    if (scout.errors === 0) {
      snapshot.body = body
    }
    Scout.findByIdAndUpdate(scout._id, {
      $push: { snapshots: snapshot },
    }).exec()

    snapshot.body = body
    alert(scout, snapshot)
    scout.errors += 1
  })
}

function add(scout) {
  scout.patrol = patrol.bind(null, scout)
  scout.script = new vm.Script(scout.testCase)
  timeouts[scout._id] = setTimeout(scout.patrol, Math.random() * scout.interval * 60 * 1000)
  scoutMap[scout._id] = scout
}

exports.add = add
exports.remove = function remove(id) {
  clearTimeout(timeouts[id])
  delete timeouts[id]
  delete scoutMap[id]
}
exports.update = function update(id, patch) {
  const scout = scoutMap[id]
  Object.assign(scout, patch)
  scout.script = new vm.Script(scout.testCase)
}

exports.dispatchAll = function dispatchAll() {
  Scout.find().select({
    snapshots: 0,
  }).lean()
  .then((scouts) => { scouts.forEach(add) })
}

exports.removeOldIntels = function removeOldIntels(since = 7) {
  Scout.update({}, {
    $pull: {
      snapshots: {
        time: {
          $lt: Date.now() - (since * 24 * 60 * 60 * 1000) } } },
  }, { multi: true }).exec()
}
