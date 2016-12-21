const mongoose = require('./db')

const { floor } = Math
const ScoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tags: [String],
  method: {
    type: String,
    uppercase: true,
    enum: ['GET', 'HEAD', 'POST'],
    default: 'GET',
  },
  URL: { type: String, required: true },
  body: String,
  recipients: [String],

  headers: [[String]],
  ApdexTarget: { type: Number, default: 500, min: 100, get: floor, set: floor },
  interval: { type: Number, default: 5, min: 1, get: floor, set: floor },
  tolerance: { type: Number, default: 0, min: 0, get: floor, set: floor },

  readType: { type: String, enum: ['text', 'json'], default: 'text' },
  testCase: String,

  snapshots: [{
    _id: false,
    timestamp: { type: Date, default: Date.now },
    status: { type: 'String', enum: ['OK', 'Error', 'Idle'], required: true },
    statusCode: Number,
    responseTime: Number,
    errMessage: String,
    body: String,
  }],
  workTime: [[[Number]]],
})

module.exports = mongoose.model('Scout', ScoutSchema)
