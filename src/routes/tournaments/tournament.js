const tournamentService = require('./tournamentService')
const addParticipants = require('./bracket/bracket')

const tournament = async function (fastify, options, next) {
  fastify.post('/', tournamentService.newTournament)
  fastify.get('/:id', tournamentService.getTournament)
  fastify.post('/:id/bracket', addParticipants)
  // fastify.put('/:id/matches/:id', reportMatchResult)
  next()
}

module.exports = tournament
