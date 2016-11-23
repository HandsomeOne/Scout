const Scout = require('../scout')

module.exports = function crud(server) {
  server.post('/scout', (req, res) => {
    let doc = ''
    req.on('data', (chunk) => { doc += chunk })
    req.on('end', () => {
      Scout.create(JSON.parse(doc)).then((scout) => {
        res.send(scout)
      }).catch((err) => {
        res.send(err)
      })
    })
  })
  server.put('/scout/:id', (req, res) => {
    let doc = ''
    req.on('data', (chunk) => { doc += chunk })
    req.on('end', () => {
      Scout.findByIdAndUpdate(req.params.id, JSON.parse(doc)).then(() => {
        res.status(204)
        res.end()
      }).catch((err) => {
        res.send(err)
      })
    })
  })
  server.get('/scout', (req, res) => {
    Scout.find().then((scouts) => {
      res.send(scouts)
    }).catch((err) => {
      res.send(err)
    })
  })
  server.del('/scout/:id', (req, res) => {
    Scout.findByIdAndRemove(req.params.id).then(() => {
      res.status(204)
      res.end()
    }).catch((err) => {
      res.send(err)
    })
  })
}
