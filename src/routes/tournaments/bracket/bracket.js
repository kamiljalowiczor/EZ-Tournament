const axios = require('axios')
const bracketUtils = require('./helpers')

async function addParticipants (req, reply) {
  const databaseUrl = this.config.DATABASE_URL

  const tournamentId = req.params.id
  const participants = req.body.participants
  const roundsAmount = bracketUtils.getAmountOfRounds(participants.length)
  const rounds = bracketUtils.populateRoundsArrayWithPlayers(participants, roundsAmount)

  const payload = {
    participantsAmount: participants.length,
    rounds
  }

  // let tournamentData
  // await axios.get(`${databaseUrl}/tournaments/${tournamentId}.json`)
    // .then((dbRes) => {
      // tournamentData = dbRes.data
    // })
    // .catch(() => {
      // payload = { error: '502 Bad Gateway' }
      // reply.code(502)
    // })

  // payload = tournamentData
  reply.code(200)
  reply.send(payload)
}

module.exports = addParticipants
