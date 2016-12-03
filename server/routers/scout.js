const Scout = require('../models/Scout')

function extract(scout) {
  return {
    id: scout.id,
    name: scout.name,
    tags: scout.tags,
    recipients: scout.recipients,
    URL: scout.URL,
    status: scout.snapshots.length ?
      scout.snapshots[scout.snapshots.length - 1].status :
      undefined,
    Apdex: scout.getApdex() || undefined,
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
        res.send(extract(scout))
      }).catch((err) => {
        res.send(err.toString())
      })
    })
  })
  server.get('/scouts', (req, res) => {
    Scout.find().then((scouts) => {
      res.send(scouts.map(extract))
    }).catch((err) => {
      res.send(err.toString())
    })
  })
  server.get('/scout/:id', (req, res) => {
    Scout.findById(req.params.id).then((scout) => {
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
