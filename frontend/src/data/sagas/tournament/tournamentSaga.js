import {
  newTournamentSubmitStart,
  newTournamentSubmitSuccess,
  newTournamentSubmitFail,
  newTournamentUrlChangeStart,
  newTournamentUrlChangeAvailable,
  newTournamentUrlChangeNotAvailable
} from '../../actions/tournament/tournamentActions'
import { put, call, delay, race } from 'redux-saga/effects'
import {
  submitNewTournament,
  isUrlAvailable
} from '../../api/tournament/tournamentApi'

export function * newTournamentSubmitSaga (action) {
  yield put(newTournamentSubmitStart())

  const newTournamentTimeout = 5000
  try {
    const tournamentData = action.tournamentData
    const result = yield race({
      tournamentLinks: call(submitNewTournament, tournamentData),
      timeout: delay(newTournamentTimeout)
    })

    if (result.tournamentData instanceof Error) {
      throw result.tournamentData
    }

    const completeTournamentData = {
      ...result.tournamentLinks,
      ...action.tournamentData
    }

    if (!result.timeout) {
      yield put(newTournamentSubmitSuccess(completeTournamentData))
    } else {
      yield put(newTournamentSubmitFail('timeout'))
    }
  } catch (error) {
    console.error(error)
    yield put(newTournamentSubmitFail(error))
  }
}

export function * newTournamentUrlChangeSaga (action) {
  yield put(newTournamentUrlChangeStart())
  try {
    yield call(isUrlAvailable, action.url)
    yield put(newTournamentUrlChangeAvailable(action.url))
  } catch (error) {
    yield put(newTournamentUrlChangeNotAvailable(error))
  }
}
