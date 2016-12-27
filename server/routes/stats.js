const Scout = require('../models/Scout')
const cut = require('../utils/cut')
const getStats = require('../utils/getStats')

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
}
