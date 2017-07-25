import mongoose from './db'

const SettingsSchema = new mongoose.Schema({
  alertURL: String,
  alertOnRecovery: { type: Boolean, default: true },
})

export default mongoose.model('Settings', SettingsSchema)
