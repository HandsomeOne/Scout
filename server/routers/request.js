const fetch = require('isomorphic-fetch')
const inspect = require('util').inspect
const arrayToHeaders = require('../utils/arrayToHeaders')

module.exports = function request(server) {
  server.post('/request', (req, res) => {
    let data = ''
    req.on('data', (chunk) => { data += chunk })
    req.on('end', () => {
      data = JSON.parse(data)
      fetch(data.URL, {
        method: data.method,
        body: data.body,
        headers: arrayToHeaders(data.headers),
      }).then(_res => _res[data.readType]())
        .then((body) => {
          res.send({
            status: 'OK',
            body,
            beautifiedBody: inspect(body),
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
  })
}
