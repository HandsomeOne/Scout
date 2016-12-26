const Scout = require('../models/Scout')
const { refresh } = require('../actions/patrol')
const cut = require('../utils/cut')
const getStats = require('../utils/getStats')

function getHistory(scout) {
  const { snapshots } = scout
  const data = []
  for (let i = 0; i < 24; i += 1) {
    data[i] = {}
  }

  function getHourDiff(a, b) {
    const msPerHour = 1000 * 60 * 60
    return Math.floor(a / msPerHour) - Math.floor(b / msPerHour)
  }

  const latest = Date.now()
  if (snapshots.length) {
    for (let i = scout.snapshots.length - 1; i >= 0; i -= 1) {
      const { status, timestamp } = scout.snapshots[i]
      const diff = getHourDiff(latest, timestamp)
      if (diff >= 24) {
        break
      }
      data[diff][status] = (data[diff][status] || 0) + 1
    }
  }
  return {
    latest,
    data,
  }
}

function extract(scout) {
  const snapshots = cut(scout.snapshots, 24 * 60)
  const stats = getStats(snapshots, scout.ApdexTarget)
  return {
    id: scout._id,
    name: scout.name,
    tags: scout.tags,
    recipients: scout.recipients,
    URL: scout.URL,
    ApdexTarget: scout.ApdexTarget,
    status: scout.snapshots.length ?
      scout.snapshots[scout.snapshots.length - 1].status :
      null,
    Apdex: stats.Apdex,
    history: getHistory(scout),
  }
}
function extractForm(scout) {
  return {
    name: scout.name,
    tags: scout.tags,
    method: scout.method,
    URL: scout.URL,
    body: scout.body,
    recipients: scout.recipients,
    headers: scout.headers,
    ApdexTarget: scout.ApdexTarget,
    interval: scout.interval,
    tolerance: scout.tolerance,
    readType: scout.readType,
    testCase: scout.testCase,
    workTime: scout.workTime,
  }
}

module.exports = (server) => {
  server.post('/scout', (req, res) => {
    Scout.create(req.body).lean().then((scout) => {
      refresh()
      res.status(201)
      res.send(extract(scout))
    })
    .catch((err) => {
      res.status(500)
      res.end(err.toString())
    })
  })
  server.patch('/scout/:id', (req, res) => {
    Scout.findByIdAndUpdate(req.params.id, req.body).lean()
    .then((scout) => {
      refresh()
      res.send(extract(Object.assign(scout, req.body)))
    })
    .catch((err) => {
      res.status(500)
      res.end(err.toString())
    })
  })
  server.get('/scouts', (req, res) => {
    Scout.find().lean()
    .then((scouts) => {
      res.send(scouts.map(extract))
    })
    .catch((err) => {
      res.status(500)
      res.end(err.toString())
    })
  })
  server.get('/scout/:id', (req, res) => {
    Scout.findById(req.params.id).lean()
    .then((scout) => {
      res.send(extractForm(scout))
    })
    .catch((err) => {
      res.status(500)
      res.end(err.toString())
    })
  })
  server.del('/scout/:id', (req, res) => {
    Scout.findByIdAndRemove(req.params.id)
    .then(() => {
      refresh()
      res.status(204)
      res.end()
    })
    .catch((err) => {
      res.status(500)
      res.end(err.toString())
    })
  })
}
