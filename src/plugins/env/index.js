const fastifyEnv = require('fastify-env')
const fp = require('fastify-plugin')

module.exports = fp(function (fastify, options, next) {
  const schema = {
    type: 'object',
    required: ['DATABASE_URL'],
    properties: {
      DATABASE_URL: {
        type: 'string',
        default: ''
      }
    }
  }

  const envOptions = {
    confKey: 'config',
    schema: schema,
    dotenv: {
      path: './.env',
      debug: true
    }
  }

  fastify
    .register(fastifyEnv, envOptions)
    .ready((err) => {
      if (err) console.error(err)
    })

  next()
})
