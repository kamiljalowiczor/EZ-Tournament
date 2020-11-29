const axios = require('axios')
const { tournamentStatusTypes } = require('../../../tournamentService')

async function endTournament (req, reply) {
  
}

async function reportMatchScore (req, reply) {
  let payload = {}
  const databaseUrl = this.config.DATABASE_URL

  const tournamentId = req.params.tournamentId
  const roundId = +req.params.roundId
  const matchId = +req.params.matchId
  const player1Data = req.body.player1Data
  const player2Data = req.body.player2Data
  const isFinal = req.body.isFinal

  const matchResultPayload = {
    id: +matchId,
    players: [player1Data, player2Data]
  }

  // status: dziala reportowanie wynikow dla mecza
  // todo: zrobienie zeby przechodzil do nastepnej rundy od razu i po stronie be i po stronie fe (do rozwazenia czy zwracac caly tournament jak debil czy w reducerze wkladac po prostu nowe wyniki typu rounds = { ...rounds, round[roundId]: matchId[id]})
  // jakis mechanizm zeby nie reportowac scoreow dwa razy
  // naprawa walkowerow

  await axios.put(`${databaseUrl}/tournaments/${tournamentId}/bracket/rounds/${roundId}/matches/${matchId}.json`, matchResultPayload)
    .then(() => {
      reply.code(200)
    })
    .catch(() => {
      payload = { error: '502 Bad Gateway' }
      reply.code(502)
    })

  const winnerData = player1Data.score > player2Data.score
    ? { ...player1Data, score: 0 }
    : { ...player2Data, score: 0 }

  if (isFinal) {
    // END TOURNAMENT
    const endTournamentPayload = {
      winner: winnerData,
      progressStatus: tournamentStatusTypes.FINISHED
    }

    await axios.patch(`${databaseUrl}/tournaments/${tournamentId}/bracket.json`, endTournamentPayload)
      .then(() => {
        payload = endTournamentPayload
      })
      .catch(() => {
        payload = { error: '502 Bad Gateway' }
        reply.code(502)
        reply.send()
      })
  } else {
    // REPORT SCORE AS USUAL
    const nextRoundId = roundId + 1
    const nextMatchId = Math.floor(matchId / 2)
    const nextMatchPlayerSlot = matchId % 2 === 0 ? 0 : 1

    await axios.put(`${databaseUrl}/tournaments/${tournamentId}/bracket/rounds/${nextRoundId}/matches/${nextMatchId}/players/${nextMatchPlayerSlot}.json`, winnerData)
      .then(() => {
        reply.code(200)
        payload = {
          winner: {
            ...winnerData,
            score: 0
          },
          nextRoundId,
          nextMatchId,
          nextMatchPlayerSlot
        }
      })
      .catch(() => {
        payload = { error: '502 Bad Gateway' }
        reply.code(502)
        reply.send()
      })
  }

  reply.code(200)
  reply.send(payload)
}

module.exports = reportMatchScore
