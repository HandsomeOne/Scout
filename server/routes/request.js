const fetch = require('isomorphic-fetch')
const inspect = require('util').inspect
const arrayToHeaders = require('../utils/arrayToHeaders')

module.exports = (server) => {
  server.post('/request', (req, res) => {
    try {
      let statusCode
      let statusText
      let responseTime
      const start = Date.now()
      fetch(req.params.URL, {
        method: req.params.method,
        body: req.params.body,
        headers: arrayToHeaders(req.params.headers),
      })
      .then((_res) => {
        statusCode = _res.status
        statusText = _res.statusText
        responseTime = Date.now() - start
        return _res[req.params.readType]()
      })
      .then((body) => {
        res.send({
          status: 'OK',
          statusCode,
          statusText,
          responseTime,
          body,
          beautifiedBody: typeof body === 'string' ? body : inspect(body, { colors: true }),
        })
      })
      .catch((err) => {
        res.send({
          status: 'Error',
          name: err.name,
          message: err.message,
        })
      })
    } catch (err) {
      res.status(500)
      res.send({
        status: 'Error',
        name: err.name,
        message: err.message,
      })
    }
  })
}
