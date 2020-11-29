const axios = require('axios')
const { tournamentStatusTypes } = require('../tournamentService')
const bracketUtils = require('./helpers')

async function updateBracket (req, reply) {
  const databaseUrl = this.config.DATABASE_URL

  const tournamentId = req.params.id
  const participants = req.body.participants
  const isStartTournamentRequest = req.body.isStartTournamentRequest
  const roundsAmount = bracketUtils.getAmountOfRounds(participants.length)
  const rounds = bracketUtils.populateRoundsArrayWithPlayers(participants, roundsAmount)

  let payload = {
    rounds,
    participants,
    progressStatus: isStartTournamentRequest ? tournamentStatusTypes.IN_PROGRESS : tournamentStatusTypes.NOT_STARTED
  }

  await axios.put(`${databaseUrl}/tournaments/${tournamentId}/bracket.json`, payload)
    .then(() => {
      reply.code(200)
    })
    .catch(() => {
      payload = { error: '502 Bad Gateway' }
      reply.code(502)
    })

  reply.code(200)
  reply.send(payload)
}

module.exports = updateBracket
