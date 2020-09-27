import { all } from 'redux-saga/effects'
import { watchTournament } from '../../data/sagas/tournament'

// Here should be added future sagas watchers
export default function * rootSaga () {
  yield all([
    watchTournament()
  ])
}
