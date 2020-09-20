const fs = require('fs')
const path = require('path')

const catchAll = function (fastify, options, done) {
  fastify.get('*', (request, reply) => {
    const stream = fs.createReadStream(path.join(__dirname, '..', '..', '..', 'frontend', 'dist', 'index.html'))
    reply.type('text/html').send(stream)
  })
  done()
}

module.exports = catchAll
