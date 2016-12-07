const Scout = require('../models/Scout')

function getApdex(scout, duration = 24 * 60 * 60 * 1000, step = 6) {
  let total = 0
  let satisfied = 0
  let tolerating = 0
  for (let i = scout.snapshots.length - 1; i >= 0; i -= step) {
    const { responseTime, timestamp } = scout.snapshots[i]
    if (timestamp.getTime() <= Date.now() - duration) {
      break
    }
    if (responseTime) {
      total += 1
      const ratio = responseTime / scout.ApdexTarget
      if (ratio <= 1) {
        satisfied += 1
      } else if (ratio <= 4) {
        tolerating += 1
      }
    }
  }
  return (satisfied + (tolerating / 2)) / total
}
function extract(scout) {
  return {
/* eslint-disable no-underscore-dangle */
    id: scout._id,
/* eslint-enable no-underscore-dangle */
    name: scout.name,
    tags: scout.tags,
    recipients: scout.recipients,
    URL: scout.URL,
    status: scout.snapshots.length ?
      scout.snapshots[scout.snapshots.length - 1].status :
      null,
    Apdex: getApdex(scout),
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
    let doc = ''
    req.on('data', (chunk) => { doc += chunk })
    req.on('end', () => {
      doc = JSON.parse(doc)
      Scout.create(doc).then((scout) => {
        res.status(201)
        res.send(extract(scout))
      }).catch((err) => {
        res.send(err.toString())
      })
    })
  })
  server.put('/scout/:id', (req, res) => {
    let doc = ''
    req.on('data', (chunk) => { doc += chunk })
    req.on('end', () => {
      doc = JSON.parse(doc)
      Scout.findById(req.params.id).then((scout) => {
        Object.assign(scout, doc)
        scout.save()
        res.status(201)
        res.send(extract(scout))
      }).catch((err) => {
        res.send(err.toString())
      })
    })
  })
  server.get('/scouts', (req, res) => {
    Scout.find().lean().then((scouts) => {
      res.send(scouts.map(extract))
    }).catch((err) => {
      res.send(err.toString())
    })
  })
  server.get('/scout/:id', (req, res) => {
    Scout.findById(req.params.id).lean().then((scout) => {
      res.send(extractForm(scout))
    }).catch((err) => {
      res.send(err.toString())
    })
  })
  server.del('/scout/:id', (req, res) => {
    Scout.findByIdAndRemove(req.params.id).then(() => {
      res.status(204)
      res.end()
    }).catch((err) => {
      res.send(err.toString())
    })
  })
}
