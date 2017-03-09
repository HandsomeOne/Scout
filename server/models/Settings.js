const mongoose = require('./db')

const SettingsSchema = new mongoose.Schema({
  alertURL: String,
  alertOnRecovery: { type: Boolean, default: true },
})

module.exports = mongoose.model('Settings', SettingsSchema)
