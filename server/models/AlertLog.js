const mongoose = require('./db')

const AlertLogSchema = new mongoose.Schema({
  message: {
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
  },
  time: { type: Date, default: Date.now },
  status: { type: 'String', enum: ['OK', 'Error'], required: true },
  statusCode: Number,
  errMessage: String,
  body: String,
})

module.exports = mongoose.model('AlertLog', AlertLogSchema)
