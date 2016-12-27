const Scout = require('../models/Scout')
const cut = require('../utils/cut')
const cutAndFold = require('../utils/cutAndFold')
const getStats = require('../utils/getStats')
const { getStatuses } = require('../utils/getFoldedStats')

module.exports = (server) => {
  server.get('/stats/__snapshots/:id', (req, res) => {
    Scout.findById(req.params.id).lean()
    .then((scout) => {
      res.send(scout.snapshots)
    })
  })
  server.get('/stats/:id', (req, res) => {
    Scout.findById(req.params.id).lean()
    .then((scout) => {
      const snapshots = cut(scout.snapshots, req.params.since)
      const stats = getStats(snapshots, scout.ApdexTarget)
      stats.ApdexTarget = scout.ApdexTarget
      stats.name = scout.name
      stats.URL = scout.URL
      res.send(stats)
    })
  })
  server.get('/stats/health/:id', (req, res) => {
    Scout.findById(req.params.id).lean()
    .then((scout) => {
      const now = Date.now()
      const snapshots = cutAndFold(scout.snapshots, req.params.since, req.params.interval)
      const statuses = getStatuses(snapshots)
      res.send({ now, statuses })
    })
  })
}
