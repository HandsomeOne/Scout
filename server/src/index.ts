import * as restify from 'restify'
import * as path from 'path'
import * as corsMiddleware from 'restify-cors-middleware'
const cors = corsMiddleware({
  origins: ['http://localhost:3000'],
  allowHeaders: [],
  exposeHeaders: [],
})

const server = restify.createServer()
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.gzipResponse())
server.pre(cors.preflight)
server.use(cors.actual)

require('./routes/scout')(server)
require('./routes/stats')(server)
require('./routes/settings')(server)
require('./routes/request')(server)
require('./routes/test')(server)
require('./routes/alertLog')(server)

server.get('/*', restify.plugins.serveStatic({
  directory: path.join(__dirname, '../../client/build'),
  default: 'index.html',
}))
server.listen(3001)


import * as Squad from './models/Squad'

Squad.dispatchAll()
Squad.removeOldIntels()
setInterval(Squad.removeOldIntels, 24 * 60 * 60 * 1000)
