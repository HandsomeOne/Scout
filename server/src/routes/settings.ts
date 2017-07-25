import fetch from 'node-fetch'
import getSettings from '../models/getSettings'

export = (server) => {
  server.patch('/settings', (req, res) => {
    getSettings()
    .then(settings => settings.update(req.body))
    .then(() => {
      res.status(204)
      res.end()
    })
    .catch((err) => {
      res.status(500)
      res.end(err.toString())
    })
  })
  server.get('/settings', (req, res) => {
    getSettings().then(settings => res.send(settings))
  })

  server.post('/settings/test', (req, res) => {
    let statusCode
    let statusText
    Promise.resolve()
    .then(() => (
      fetch(req.params.alertURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipients: req.params.recipients,
          name: '查询当前时间',
          URL: 'https://your.server/your/api',
          status: 'Error',
          statusCode: 200,
          responseTime: 53,
          now: 1484292986935,
          errName: 'AssertionError',
          errMessage: '慢了123秒',
          body: '{now:1484292863588}',
          readType: 'json',
          testCase: 'const d = Date.now() - body.now\nassert(d < 60000, `慢了${d/1000|0}秒`)',
        }),
      })
    ))
    .then((_res) => {
      statusCode = _res.status
      statusText = _res.statusText
      return _res.text()
    })
    .then((body) => {
      res.send({
        status: 'OK',
        statusCode,
        statusText,
        body,
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
