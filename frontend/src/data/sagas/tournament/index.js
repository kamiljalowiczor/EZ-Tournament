import { takeLatest } from 'redux-saga/effects'
import {
  newTournamentSubmitSaga,
  newTournamentUrlChangeSaga,
  loadTournamentSaga,
  startTournamentSaga
} from './tournamentSaga'
import { tournamentActionTypes } from '../../../common/constants/actionTypes'

export function * watchTournament () {
  yield takeLatest(tournamentActionTypes.NEW_TOURNAMENT_SUBMIT, newTournamentSubmitSaga)
  yield takeLatest(tournamentActionTypes.NEW_TOURNAMENT_URL_CHANGE, newTournamentUrlChangeSaga)
  yield takeLatest(tournamentActionTypes.LOAD_TOURNAMENT, loadTournamentSaga)
  yield takeLatest(tournamentActionTypes.START_TOURNAMENT, startTournamentSaga)
}
