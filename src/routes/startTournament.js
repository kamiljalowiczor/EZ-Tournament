const startTournament = async function (fastify, options, next) {
  fastify.post('/', async function (req, reply) {
    // // purpose: wygenerowanie drabinki z calym setem danych, tak zeby mozna bylo pozniej juz tylko updateowac dane po id
    // const interfaceXd = {
    //   numberOfPlayers,
    //   numberOfRounds,
    //   rounds: [
    //     {
    //       roundId: 0,
    //       matches: [
    //       {
    //         matchId, // od 1 do 2^n dla kazdej rundy, zeby wiedziec do ktorego meczu przechodzi zawodnik wygrany to wystarczy znalezc w nastepnej rundzie matchId = Math.ceil(matchId / 2)
    //         players: [
    //           {
    //             id,
    //             name
    //             score
    //           }
    //         ]
    //       },
    //     ]
    //   }]
    // }

    // const mockParticipants = ['gracz1', 'gracz2', 'gracz3', 'gracz4']

    // const data = req.body // to do bazy

    // console.log(req)

    // reply.code(200).send(res)
  })
  next()
}

module.exports = startTournament
