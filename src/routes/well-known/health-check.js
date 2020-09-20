module.exports = function (instance, opts, next) {
  instance.get('/health-check', async (request, reply) => {
    reply.send({
      message: 'OK'
    })
  })

  next()
}
