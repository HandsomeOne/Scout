const restify = require('restify')
const path = require('path')

const server = restify.createServer()
server.use(restify.bodyParser())
server.use(restify.gzipResponse())
server.use(restify.CORS({
  origins: ['http://localhost:3000'],
}))

require('./routes/scout')(server)
require('./routes/stats')(server)
require('./routes/settings')(server)
require('./routes/request')(server)
require('./routes/test')(server)

server.get(/\/?.*/, restify.serveStatic({
  directory: path.join(__dirname, '../static'),
  default: 'index.html',
}))

server.listen(3001)

require('./actions/patrol').patrolAll()
