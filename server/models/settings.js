const mongoose = require('./db')

const SettingsSchema = new mongoose.Schema({
  alertURL: String,
})

module.exports = mongoose.model('Settings', SettingsSchema)
