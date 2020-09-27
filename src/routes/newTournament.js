const newTournament = async function (fastify, options, next) {
  fastify.post('/', async function (req, reply) {
    // zapytanie do bazy zeby wziac ostatnie id turnieju i sprawdzic czy wolne
    // stworz link i wrzuc do jsona
    // zapisz to co przyszlo do bazy z dodatkowymi linkami
    // odeslij linki

    const res = {
      id: 71,
      adminLink: 'szefpowitany/a9ttknvw224fcsa',
      publicLink: 'szefpowitany'
    }

    const data = req.body // to do bazy

    console.log(req)

    reply.code(200).send(res)
  })
  next()
}

module.exports = newTournament
