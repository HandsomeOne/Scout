const fetch = require('isomorphic-fetch')
const inspect = require('util').inspect
const arrayToHeaders = require('../utils/arrayToHeaders')

module.exports = (server) => {
  server.post('/request', (req, res) => {
    let statusCode
    let statusText
    let responseTime
    const start = Date.now()
    Promise.resolve().then(() => (
      fetch(req.params.URL, {
        method: req.params.method,
        body: req.params.body,
        headers: arrayToHeaders(req.params.headers),
      })
    ))
    .then((_res) => {
      statusCode = _res.status
      statusText = _res.statusText
      responseTime = Date.now() - start
      return _res.text()
    })
    .then((_body) => {
      const isJSON = req.params.readType === 'json'
      const body = isJSON ? JSON.parse(_body) : _body
      const beautifiedBody = isJSON ? inspect(body, { colors: true }) : body
      res.send({
        status: 'OK',
        statusCode,
        statusText,
        responseTime,
        body,
        beautifiedBody,
      })
    })
    .catch((err) => {
      res.send({
        status: 'Error',
        name: err.name,
        message: err.message,
      })
    })
  })
}
