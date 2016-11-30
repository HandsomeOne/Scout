const fetch = require('isomorphic-fetch')
const Settings = require('../models/settings')

let settings = {}
Settings.findOne().then((doc) => {
  settings = doc
})

module.exports = function crud(server) {
  server.put('/settings', (req, res) => {
    let doc = ''
    req.on('data', (chunk) => { doc += chunk })
    req.on('end', () => {
      doc = JSON.parse(doc)
      Object.assign(settings, doc)
      settings.save()
      res.status(204)
      res.end()
    })
  })
  server.get('/settings', (req, res) => {
    res.send(settings)
  })

  server.post('/settings/test', (req, res) => {
    let data = ''
    req.on('data', (chunk) => { data += chunk })
    req.on('end', () => {
      data = JSON.parse(data)
      try {
        let statusCode
        let statusText
        fetch(data.alertURL, {
          method: 'POST',
          body: JSON.stringify({
            recipients: data.recipients,
            name: '测试接口',
            errMessage: '这是一条测试错误信息',
            detail: '',
          }),
        })
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
