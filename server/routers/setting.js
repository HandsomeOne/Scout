const Setting = require('../models/setting')

let setting = {}
Setting.findOne().then((doc) => {
  setting = doc || new Setting()
  setting.save()
})

module.exports = function crud(server) {
  server.put('/setting', (req, res) => {
    let doc = ''
    req.on('data', (chunk) => { doc += chunk })
    req.on('end', () => {
      doc = JSON.parse(doc)
      Object.assign(setting, doc)
      setting.save()
      res.status(204)
      res.end()
    })
  })
  server.get('/setting', (req, res) => {
    res.send(setting)
  })
}
