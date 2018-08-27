import * as mongoose from 'mongoose'

mongoose.connect(process.argv[2] || 'mongodb://localhost/scout')

export default mongoose
