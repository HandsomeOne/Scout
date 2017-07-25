import * as mongoose from 'mongoose'

(mongoose as any).Promise = global.Promise
mongoose.connect(process.argv[2] || 'mongodb://localhost/scout', { useMongoClient: true })

export default mongoose
