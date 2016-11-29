const Scout = require('../models/scout')

module.exports = function clear(server) {
  server.get('/clear', (_, res) => {
    Scout.remove({}).then(() => {
      res.status(204)
      res.end()
    }).catch((err) => {
      res.send(err)
    })
  })
}
