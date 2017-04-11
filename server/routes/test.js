const vm = require('vm')
const assert = require('assert')
const inspect = require('util').inspect

module.exports = (server) => {
  server.post('/test', (req, res) => {
    const logs = []

    function log(...any) {
      logs.push(any.map(v => (
        typeof v === 'string' ? v : inspect(v, { colors: true })
      )).join(' '))
    }
    try {
      new vm.Script(req.params.testCase).runInNewContext({
        assert,
        statusCode: req.params.statusCode,
        responseTime: req.params.responseTime,
        body: req.params.body,
        console: { log },
        log,
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
}
