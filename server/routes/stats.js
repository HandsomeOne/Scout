const Scout = require('../models/Scout')

module.exports = (server) => {
  server.get('/stats/__snapshots/:id', (req, res) => {
    Scout.findById(req.params.id).lean()
    .then((scout) => {
      res.send(scout.snapshots)
    })
  })
}
