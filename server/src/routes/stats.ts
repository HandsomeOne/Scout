import Scout from '../models/Scout'
import cut from '../utils/cut'
import cutAndFold from '../utils/cutAndFold'
import getStats from '../utils/getStats'
import getErrorLog from '../utils/getErrorLog'
const { getStatuses } = require('../utils/getFoldedStats')

export = server => {
  server.get('/stats/__snapshots/:id', (req, res) => {
    Scout.findById(req.params.id)
      .lean()
      .then((scout: any) => {
        res.send(scout.snapshots)
      })
  })

  server.get('/stats/:id', (req, res) => {
    Scout.findById(req.params.id)
      .lean()
      .then((scout: any) => {
        const snapshots = cut(scout.snapshots, req.params.since)
        const stats: any = getStats(snapshots, scout.ApdexTarget)
        stats.ApdexTarget = scout.ApdexTarget
        stats.name = scout.name
        stats.URL = scout.URL
        res.send(stats)
      })
  })

  server.get('/stats/health/:id', (req, res) => {
    Scout.findById(req.params.id)
      .lean()
      .then((scout: any) => {
        const now = Date.now()
        const snapshots = cutAndFold(
          scout.snapshots,
          req.params.since,
          req.params.interval,
        )
        const statuses = getStatuses(snapshots)
        res.send({ now, statuses })
      })
  })

  server.get('/stats/errorlog/:id', (req, res) => {
    Scout.findById(req.params.id)
      .lean()
      .then((scout: any) => {
        const snapshots = cut(scout.snapshots, req.params.since)
        const stats = getErrorLog(snapshots)
        res.send(stats)
      })
  })
}
