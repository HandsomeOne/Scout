import fetch from 'node-fetch'
import * as vm from 'vm'
import * as assert from 'assert'
import arrayToHeaders from '../utils/arrayToHeaders'
import getSettings from './getSettings'
import Scout from './Scout'
import AlertLog from './AlertLog'

const timeouts = {}
const scoutMap = {}

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
  const timeArray = [time.getDay(), time.getHours(), time.getMinutes()]

  return workTime.some(range => {
    if (compare(range[0], range[1]) <= 0) {
      return (
        compare(range[0], timeArray) <= 0 && compare(timeArray, range[1]) < 0
      )
    }
    return compare(range[1], timeArray) <= 0 || compare(timeArray, range[0]) < 0
  })
}

function alert(scout, snapshot, alertURL) {
  const message = Object.assign(
    {
      recipients: scout.recipients,
      name: scout.name,
      URL: scout.URL,
      readType: scout.readType,
      testCase: scout.testCase,
      now: Date.now(),
    },
    snapshot,
  )

  let statusCode
  fetch(alertURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  })
    .then(res => {
      statusCode = res.status
      return res.text()
    })
    .then(body => {
      AlertLog.create({
        scoutId: scout._id,
        message,
        status: 'OK',
        body,
        statusCode,
      })
    })
    .catch(err => {
      AlertLog.create({
        scoutId: scout._id,
        message,
        status: 'Error',
        statusCode,
        errMessage: err.message,
      })
    })
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
    .then(res => {
      statusCode = res.status
      return res.text()
    })
    .then(_body => {
      const isJSON = scout.readType === 'json'
      responseTime = Date.now() - start
      body = _body
      scout.script.runInNewContext({
        assert,
        statusCode,
        responseTime,
        body: isJSON ? JSON.parse(body) : body,
        console: { log() {} },
        log() {},
      })

      return {
        status: 'OK',
        statusCode,
        responseTime,
      }
    })
    .catch(err => ({
      status: 'Error',
      statusCode,
      responseTime,
      errName: err.name,
      errMessage: err.message,
    }))
    .then((snapshot: any) => {
      const { status } = snapshot
      if (scout.errors === 0 && status === 'Error') {
        snapshot.body = body
      }
      Scout.findByIdAndUpdate(scout._id, {
        $push: { snapshots: snapshot },
      }).exec()

      getSettings().then((settings: any) => {
        if (!settings.alertURL) return

        if (status === 'OK') {
          if (settings.alertOnRecovery && scout.errors > scout.tolerance) {
            alert(scout, snapshot, settings.alertURL)
          }
          scout.errors = 0
        } else if (status === 'Error') {
          snapshot.body = body
          if (scout.errors === scout.tolerance) {
            alert(scout, snapshot, settings.alertURL)
          }
          scout.errors += 1
        }
      })
    })
}

export function add(scout) {
  scout.patrol = patrol.bind(null, scout)
  scout.script = new vm.Script(scout.testCase)
  scout.errors = 0
  timeouts[scout._id] = setTimeout(
    scout.patrol,
    Math.random() * scout.interval * 60 * 1000,
  )
  scoutMap[scout._id] = scout
}

export function remove(id) {
  clearTimeout(timeouts[id])
  delete timeouts[id]
  delete scoutMap[id]
}
export function update(id, patch) {
  const scout = scoutMap[id]
  Object.assign(scout, patch)
  scout.script = new vm.Script(scout.testCase)
}

export function dispatchAll() {
  Scout.find()
    .select({
      snapshots: 0,
    })
    .lean()
    .then((scouts: any) => {
      scouts.forEach(add)
    })
}

export function removeOldIntels(since = 7) {
  Scout.update(
    {},
    {
      $pull: {
        snapshots: {
          time: {
            $lt: Date.now() - since * 24 * 60 * 60 * 1000,
          },
        },
      },
    },
    { multi: true },
  ).exec()
}
