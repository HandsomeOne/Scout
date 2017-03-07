const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.argv[2] || 'mongodb://localhost/scout')

module.exports = mongoose
