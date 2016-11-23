const fetch = require('isomorphic-fetch')
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
        .then(res.send.bind(res))
        .catch((err) => {
          res.send(err.toString())
        })
    })
  })
}
