const vm = require('vm')
const assert = require('assert')

module.exports = function test(server) {
  server.post('/test', (req, res) => {
    let data = ''
    req.on('data', (chunk) => { data += chunk })
    req.on('end', () => {
      data = JSON.parse(data)
      try {
        new vm.Script(data.testCase).runInNewContext({ body: data.body, assert })
        res.send('OK')
      } catch (err) {
        res.send(err.toString())
      }
    })
  })
}
