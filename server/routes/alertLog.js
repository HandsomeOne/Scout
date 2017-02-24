const AlertLog = require('../models/AlertLog')

module.exports = (server) => {
  server.get('/alertlogs', (req, res) => {
    const {
      page = 1,
      pageSize = 10,
    } = req.params
    AlertLog.find()
    .sort({ time: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .lean()
    .then((alertlogs) => {
      res.send(alertlogs)
    })
    .catch((err) => {
      res.status(500)
      res.end(err.toString())
    })
  })
}
