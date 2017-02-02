const mongoose = require('./db')

const AlertLogSchema = new mongoose.Schema({
  recipients: [String],
  name: String,
  URL: String,
  status: String,
  statusCode: Number,
  responseTime: Number,
  now: Date,
  errName: String,
  errMessage: String,
  body: String,
  readType: String,
  testCase: String,
})

module.exports = mongoose.model('AlertLog', AlertLogSchema)
