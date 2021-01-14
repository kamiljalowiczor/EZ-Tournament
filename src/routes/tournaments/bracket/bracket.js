const axios = require('axios')
const { tournamentStatusTypes } = require('../tournamentService')
const bracketUtils = require('./helpers')

async function updateBracket (req, reply) {
  reply.header('Cache-Control', 'no-store, max-age=0')
  const databaseUrl = this.config.DATABASE_URL

  const tournamentId = req.params.tournamentId
  const participants = req.body.participants
  const isStartTournamentRequest = req.body.isStartTournamentRequest
  const rounds = bracketUtils.createBracketData(participants)

  let payload = {
    rounds,
    participants,
    progressStatus: isStartTournamentRequest ? tournamentStatusTypes.IN_PROGRESS : tournamentStatusTypes.NOT_STARTED
  }

  await axios.put(`${databaseUrl}/tournaments/${tournamentId}/bracket.json?access_token=${this.accessTokenDecorator.get('value')}`, payload)
    .then(() => {
      reply.code(200)
    })
    .catch((err) => {
      payload = { error: err.statusText || 'Bad Request' }
      reply.code(err.status || 400)
      reply.send()
    })

  reply.code(200)
  reply.send(payload)
}

module.exports = updateBracket
