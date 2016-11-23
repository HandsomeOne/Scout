const mongoose = require('mongoose')
const fetch = require('isomorphic-fetch')
const vm = require('vm')
const assert = require('assert')
const arrayToHeaders = require('./utils/arrayToHeaders')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/scout')

const states = {
  OK: 0,
  ERROR: 1,
  INACTIVE: 2,
}
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
  Apdex: { type: Number, default: 500, min: 100, get: floor, set: floor },
  interval: { type: Number, default: 5, min: 1, get: floor, set: floor },
  tolerance: { type: Number, default: 0, min: 0, get: floor, set: floor },

  readType: { type: String, enum: ['text', 'json'], default: 'text' },
  testCase: String,

  state: { type: Number, default: states.OK },
  workTime: [[[Number]]],
})

ScoutSchema.methods = {
  patrol() {
    fetch(this.URL, {
      method: this.method,
      headers: arrayToHeaders(this.headers),
      body: this.body,
    }).then(res => res[this.readType]())
      .then((body) => {
        new vm.Script(this.testCase).runInNewContext({ body, assert })
        this.allClear()
      }).catch(this.alert.bind(this))
  },

  isWorkTime() {
    if (!(this.workTime && this.workTime.length)) {
      return true
    }

    function compare(a, b) {
      for (let i = 0; i < 3; i += 1) {
        if (a[i] !== b[i]) {
          return Math.sign(a[i] - b[i])
        }
      }
      return 0
    }

    const time = new Date()
    const timeArray = [
      time.getDay(),
      time.getHours(),
      time.getMinutes(),
    ]

    return this.workTime.some((range) => {
      if (compare(range[0], range[1]) <= 0) {
        return compare(range[0], timeArray) <= 0 &&
              compare(timeArray, range[1]) < 0
      }
      return compare(range[1], timeArray) <= 0 ||
            compare(timeArray, range[0]) < 0
    })
  },

  allClear() {
    this.state = states.OK
    this.save()
  },

  alert(err) {
    console.log(err.message)
    if (this.state !== states.ERROR) {
      this.state = states.ERROR
      this.save()
      if (this.recipients.length) {
        fetch('http://should/be/configured', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipients: this.recipients,
            title: this.name,
            summary: err.message,
            detail: '',
          }),
        }).then(res => res.text())
          .then(console.log.bind(console))
          .catch(console.log.bind(console))
      }
    }
  },
}

module.exports = mongoose.model('Scout', ScoutSchema)
