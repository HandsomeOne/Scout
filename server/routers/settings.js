const Settings = require('../models/settings')

let settings = {}
Settings.findOne().then((doc) => {
  settings = doc || new Settings()
  settings.save()
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
}
