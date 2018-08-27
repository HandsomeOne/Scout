import { Script } from 'vm'
import * as assert from 'assert'
import { inspect } from 'util'

export = server => {
  server.post('/test', (req, res) => {
    const logs = []

    function log(...any) {
      logs.push(
        any
          .map(v => (typeof v === 'string' ? v : inspect(v, { colors: true })))
          .join(' '),
      )
    }
    try {
      new Script(req.body.testCase).runInNewContext({
        assert,
        statusCode: req.body.statusCode,
        responseTime: req.body.responseTime,
        body: req.body.body,
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
