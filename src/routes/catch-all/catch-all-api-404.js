const catchAllApi = function (fastify, options, done) {
  fastify.get('*', (request, reply) => {
    reply.code(404)
    reply.send({
      error: 'Data not found'
    })
  })
  done()
}

module.exports = catchAllApi
