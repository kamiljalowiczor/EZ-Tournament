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

export function * loadTournament (publicLink, adminId) {
  const reqData = {
    adminId
  }

  const res = yield axios.get(`/api/v1/tournaments/${publicLink}`, { params: reqData })

  return res.data
}

export function * startTournament (publicLink, participants) {
  const reqData = {
    participants
  }

  console.log(reqData)

  const config = { headers: { 'Content-Type': 'application/json' } }
  const res = yield axios.post(`/api/v1/tournaments/${publicLink}/bracket`, reqData, config)

  return res.data
}
