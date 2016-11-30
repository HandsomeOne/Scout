const mongoose = require('./db')

const SettingsSchema = new mongoose.Schema({
  alertURL: String,
})

const Settings = mongoose.model('Settings', SettingsSchema)
Settings.findOne().then((doc) => {
  if (!doc) {
    new Settings().save()
  }
})

module.exports = Settings
