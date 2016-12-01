const Scout = require('../models/Scout')

module.exports = (server) => {
  server.get('/__patrol', (_, res) => {
    Scout.find().then((scouts) => {
      scouts.forEach((scout) => {
        scout.patrol()
      })
    })
    res.status(204)
    res.end()
  })
}
