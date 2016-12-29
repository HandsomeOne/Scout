const Scout = require('../models/Scout')
const Squad = require('../models/Squad')
const cut = require('../utils/cut')
const cutAndFold = require('../utils/cutAndFold')
const getStats = require('../utils/getStats')
const { getStatuses } = require('../utils/getFoldedStats')

function extract(scout) {
  const { snapshots } = scout
  const now = Date.now()
  const cutSnapshots = cut(snapshots, 24 * 60, now)
  const foldedSnapshots = cutAndFold(snapshots, 24 * 60, 60, now)

  return {
    id: scout._id,
    name: scout.name,
    tags: scout.tags,
    recipients: scout.recipients,
    URL: scout.URL,
    ApdexTarget: scout.ApdexTarget,
    status: snapshots.length ?
      snapshots[snapshots.length - 1].status :
      null,
    now,
    Apdex: getStats(cutSnapshots, scout.ApdexTarget).Apdex,
    statuses: getStatuses(foldedSnapshots),
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
    Scout.create(req.body).then((scout) => {
      Squad.add(scout)
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
      Squad.update(req.params.id, req.body)
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
      Squad.remove(req.params.id)
      res.status(204)
      res.end()
    })
    .catch((err) => {
      res.status(500)
      res.end(err.toString())
    })
  })
}
