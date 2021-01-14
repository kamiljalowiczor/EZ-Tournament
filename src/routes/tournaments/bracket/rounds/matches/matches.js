const axios = require('axios')
const { tournamentStatusTypes } = require('../../../tournamentService')
const {
  getWinnerData,
  updateScores
} = require('./helpers')

async function reportMatchScore (req, reply) {
  reply.header('Cache-Control', 'no-store, max-age=0')
  let payload = {}
  const databaseUrl = this.config.DATABASE_URL

  const tournamentId = req.params.tournamentId
  const roundId = +req.params.roundId
  const matchId = +req.params.matchId
  const matchPlayerSlot = matchId % 2 === 0 ? 0 : 1

  const player1Data = req.body.player1Data
  const player2Data = req.body.player2Data
  const isFinal = req.body.isFinal

  const matchResultPayload = {
    id: +matchId,
    isScoreReported: true,
    players: [player1Data, player2Data]
  }

  let rounds = []
  await axios.get(`${databaseUrl}/tournaments/${tournamentId}/bracket/rounds.json?access_token=${this.accessTokenDecorator.get('value')}`)
    .then((res) => {
      rounds = res.data
    })
    .catch((err) => {
      payload = { error: err.statusText || 'Bad Request' }
      reply.code(err.status || 400)
      reply.send()
    })
  if (reply.sent) return

  // update the match that user is reporting the result for
  rounds[roundId].matches[matchId] = {
    ...rounds[roundId].matches[matchId],
    ...matchResultPayload
  }

  // recognize winner
  const winnerData = getWinnerData(player1Data, player2Data)

  let endTournamentPayload = {}

  if (isFinal) {
    // final match, end the tournament
    endTournamentPayload = {
      winner: { ...winnerData, score: 'GG' },
      progressStatus: tournamentStatusTypes.FINISHED
    }

    await axios.patch(`${databaseUrl}/tournaments/${tournamentId}/bracket.json?access_token=${this.accessTokenDecorator.get('value')}`, endTournamentPayload)
      .then(() => {
        payload = {
          ...endTournamentPayload
        }
      })
      .catch((err) => {
        payload = { error: err.statusText || 'Bad Request' }
        reply.code(err.status || 400)
        reply.send()
      })
    if (reply.sent) return
  }

  // do post match score update logic
  const updatedRounds = updateScores(rounds, roundId, matchId, matchPlayerSlot, winnerData, isFinal)

  await axios.patch(`${databaseUrl}/tournaments/${tournamentId}/bracket.json?access_token=${this.accessTokenDecorator.get('value')}`, { rounds: updatedRounds })
    .then(() => {
      payload = {
        ...endTournamentPayload,
        rounds
      }
    })
    .catch((err) => {
      payload = { error: err.statusText || 'Bad Request' }
      reply.code(err.status || 400)
      reply.send()
    })
  if (reply.sent) return

  reply.code(200)
  reply.send(payload)
}

module.exports = reportMatchScore
