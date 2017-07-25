import mongoose from './db'

const { floor } = Math
/**
 * @todo headers 应该是 [[String]]
 * @todo workTime 应该是 [[[Number]]]
 * @todo 为了 update 操作时不触发严格验证导致报错，所以暂时改为 Array
 */
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

  headers: Array,
  ApdexTarget: { type: Number, default: 500, min: 100, get: floor, set: floor },
  interval: { type: Number, default: 5, min: 1, get: floor, set: floor },
  tolerance: { type: Number, default: 0, min: 0, get: floor, set: floor },

  readType: { type: String, enum: ['text', 'json'], default: 'text' },
  testCase: String,

  snapshots: [{
    _id: false,
    time: { type: Date, default: Date.now },
    status: { type: 'String', enum: ['OK', 'Error', 'Idle'], required: true },
    statusCode: Number,
    responseTime: Number,
    errName: String,
    errMessage: String,
    body: String,
  }],
  workTime: Array,
})

export default mongoose.model('Scout', ScoutSchema)
