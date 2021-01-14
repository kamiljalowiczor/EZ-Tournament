import { all } from 'redux-saga/effects'
import { watchTournament } from '../../data/sagas/tournament'

export default function * rootSaga () {
  yield all([
    watchTournament()
  ])
}
