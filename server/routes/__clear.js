const Scout = require('../models/Scout')

module.exports = (server) => {
  server.get('/__clear', (_, res) => {
    Scout.remove({}).then(() => {
      res.status(204)
      res.end()
    })
  })
}
