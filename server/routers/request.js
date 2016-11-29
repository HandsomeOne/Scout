const fetch = require('isomorphic-fetch')
const inspect = require('util').inspect
const arrayToHeaders = require('../utils/arrayToHeaders')

module.exports = function request(server) {
  server.post('/request', (req, res) => {
    let data = ''
    req.on('data', (chunk) => { data += chunk })
    req.on('end', () => {
      data = JSON.parse(data)
      try {
        let statusCode
        let statusText
        const start = Date.now()
        fetch(data.URL, {
          method: data.method,
          body: data.body,
          headers: arrayToHeaders(data.headers),
        })
        .then((_res) => {
          statusCode = _res.status
          statusText = _res.statusText
          return _res[data.readType]()
        })
        .then((body) => {
          res.send({
            status: 'OK',
            responseTime: Date.now() - start,
            statusCode,
            statusText,
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
        res.send({
          status: 'Error',
          name: err.name,
          message: err.message,
        })
      }
    })
  })
}
