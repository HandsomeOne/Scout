const mongoose = require('./db')

const SettingsSchema = new mongoose.Schema({
  alertURL: String,
})

const Settings = mongoose.model('Settings', SettingsSchema)
let settings = new Settings()
Settings.findOne().then((doc) => {
  if (!doc) {
    settings.save()
  } else {
    settings = doc
  }
})

module.exports = () => settings
