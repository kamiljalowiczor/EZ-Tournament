const path = require('path')

module.exports = function ({ port }) {
  const app = require('fastify')({ logger: true })
  const serveStatic = require('serve-static')

  app.use('/', serveStatic(path.join(__dirname, '..', 'frontend', 'dist')))

  app.register(require('./plugins/env'))

  app.register(require('./routes/tournaments/tournament'), {
    prefix: '/api/v1/tournaments'
  })

  app.register(require('./routes/catch-all/catch-all-api-404'), {
    prefix: '/api'
  })

  app.register(require('./routes/catch-all/catch-all'))

  return app
}
