const restify = require('restify')
const path = require('path')

const server = restify.createServer()
server.use(restify.gzipResponse())
server.use(restify.CORS({
  origins: ['http://localhost:3000'],
}))

require('./routers/scout')(server)
require('./routers/settings')(server)
require('./routers/request')(server)
require('./routers/test')(server)
require('./routers/clear')(server)

server.get(/\/?.*/, restify.serveStatic({
  directory: path.join(__dirname, '../static'),
  default: 'index.html',
}))

server.listen(3001)

require('./models/scout').patrol()
