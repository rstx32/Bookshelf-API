import { server as _server } from '@hapi/hapi'
import routes from './routes.js'

(async () => {
  const hapiServer = _server({
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    port: process.env.NODE_PORT || 5000,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  })

  hapiServer.route(routes)

  await hapiServer.start()
  console.log(`app is runing at ${hapiServer.info.uri}`)
})()