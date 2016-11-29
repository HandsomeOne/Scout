const Scout = require('../models/scout')

module.exports = function crud(server) {
  server.post('/scout', (req, res) => {
    let doc = ''
    req.on('data', (chunk) => { doc += chunk })
    req.on('end', () => {
      doc = JSON.parse(doc)
      Scout.create(doc).then((scout) => {
        res.send(scout)
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
      Scout.findByIdAndUpdate(req.params.id, doc).then(() => {
        res.status(204)
        res.end()
      }).catch((err) => {
        res.send(err.toString())
      })
    })
  })
  server.get('/scout', (req, res) => {
    Scout.find().then((scouts) => {
      res.send(scouts)
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
