const catchAllApi = function (fastify, options, done) {
  fastify.get('*', (request, reply) => {
    reply.code(404)
    reply.send({
      error: 'Page not found'
    })
  })
  done()
}

module.exports = catchAllApi
