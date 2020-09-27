import axios from 'axios'
import { delay } from 'redux-saga/effects'

export function * submitNewTournament (tournamentData) {
  const config = { headers: { 'Content-Type': 'application/json' } }
  const res = yield axios.post('api/v1/new-tournament', tournamentData, config)

  // return res
  // const res = {
  //   id: 1,
  //   format: 'single elimination',
  //   name: 'puchar swiata',
  //   description: 'swietny puchar zapraszamy',
  //   host: 'pudzian',
  //   contact: 'pudzian@firma.pl'
  // }

  yield delay(4000)

  return res
}

export function * isUrlAvailable (url) {
  const data = {
    id: url
  }
  const config = { headers: { 'Content-Type': 'application/json' } }
  const res = yield axios.post('/api/v1/check-url', data, config)
  return res
}
