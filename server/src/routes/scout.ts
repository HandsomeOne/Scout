import Scout from '../models/Scout'
import * as Squad from '../models/Squad'
import cut from '../utils/cut'
import cutAndFold from '../utils/cutAndFold'
import getStats from '../utils/getStats'
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
    Apdex: (getStats(cutSnapshots, scout.ApdexTarget) as any).Apdex,
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

export = (server) => {
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

  server.get('/scouts', (req, res) => {
    Scout.find().lean()
    .then((scouts: any) => {
      res.send(scouts.map(extract))
    })
    .catch((err) => {
      res.status(500)
      res.end(err.toString())
    })
  })
  server.patch('/scouts', (req, res) => {
    const { ids, patch } = req.body
    Scout.update({ _id: {
      $in: ids,
    } }, patch, { multi: true })
    .then(() => Scout.find({ _id: {
      $in: ids,
    } }).lean())
    .then((scouts: any) => {
      ids.forEach((id) => { Squad.update(id, patch) })
      res.send(scouts.map(scout => extract(Object.assign(scout, req.body))))
    })
    .catch((err) => {
      res.status(500)
      res.end(err.toString())
    })
  })
}
