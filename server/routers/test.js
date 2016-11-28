const vm = require('vm')
const assert = require('assert')
const inspect = require('util').inspect

module.exports = function test(server) {
  server.post('/test', (req, res) => {
    let data = ''
    req.on('data', (chunk) => { data += chunk })
    req.on('end', () => {
      data = JSON.parse(data)
      const logs = []
      try {
        new vm.Script(data.testCase).runInNewContext({
          assert,
          statusCode: data.statusCode,
          responseTime: data.responseTime,
          body: data.body,
          console: {
            log(...any) {
              logs.push(any.map(v => (
                typeof v === 'string' ? v : inspect(v, { colors: true })
              )).join(' '))
            },
          },
        })
        res.send({
          status: 'OK',
          logs,
        })
      } catch (err) {
        res.send({
          status: 'Error',
          name: err.name,
          message: err.message,
          lineNumber: err.lineNumber,
          columnNumber: err.columnNumber,
          logs,
        })
      }
    })
  })
}
