const mongoose = require('./db')

const SettingSchema = new mongoose.Schema({
  alertURL: String,
})

module.exports = mongoose.model('Setting', SettingSchema)
