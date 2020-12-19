import axios from 'axios'

export function * submitNewTournament (tournamentData) {
  const config = { headers: { 'Content-Type': 'application/json' } }
  const res = yield axios.post('api/v1/tournaments', tournamentData, config)

  return res.data
}

export function * isUrlAvailable (url) {
  const reqData = {
    id: url
  }
  const config = { headers: { 'Content-Type': 'application/json' } }
  const res = yield axios.post('/api/v1/check-url', reqData, config)
  return res
}

export function * loadTournament (publicLink, adminId, isUrlCheck) {
  const reqData = {
    adminId,
    isUrlCheck
  }

  const res = yield axios.get(`/api/v1/tournaments/${publicLink}`, { params: reqData })

  return res.data
}

export function * updateBracket (publicLink, participants, isStartTournamentRequest) {
  const reqData = {
    participants,
    isStartTournamentRequest
  }

  const config = { headers: { 'Content-Type': 'application/json' } }
  const res = yield axios.put(`/api/v1/tournaments/${publicLink}/bracket`, reqData, config)

  return res.data
}

export function * reportMatchScore (publicLink, roundId, matchId, player1Data, player2Data, isFinal) {
  const reqData = {
    player1Data,
    player2Data,
    isFinal
  }

  const res = yield axios.put(`/api/v1/tournaments/${publicLink}/bracket/rounds/${roundId}/matches/${matchId}`, reqData)

  return res.data
}
