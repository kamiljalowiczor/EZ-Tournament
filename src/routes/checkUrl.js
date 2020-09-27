const url = async function (fastify, options, next) {
  fastify.post('/', async function (req, reply) {
    // zapytanie do bazy zeby sprawdzic czy id jest wolne

    const data = req.body.id // to do bazy

    const arr = ['link1', 'link2', 'link3']

    if (arr.includes(data)) {
      reply.code(422).send()
    }

    reply.code(200).send()
  })
  next()
}

module.exports = url
