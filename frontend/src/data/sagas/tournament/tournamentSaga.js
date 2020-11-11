import {
  newTournamentSubmitStart,
  newTournamentSubmitSuccess,
  newTournamentSubmitFail,
  newTournamentUrlChangeStart,
  newTournamentUrlChangeAvailable,
  newTournamentUrlChangeNotAvailable,
  loadTournamentStart,
  loadTournamentFail,
  loadTournamentSuccess,
  startTournamentStart,
  startTournamentSuccess,
  startTournamentFail
} from '../../actions/tournament/tournamentActions'
import { put, call, delay, race, select } from 'redux-saga/effects'
import {
  submitNewTournament,
  isUrlAvailable,
  loadTournament,
  startTournament
} from '../../api/tournament/tournamentApi'
import history from '../../../history'
import { getParticipantsArray } from '../../reducers/utils/tournamentUtils'

function getTournamentPublicLink () {
  return history.location.pathname.split('/')[2]
}

export function * newTournamentSubmitSaga (action) {
  yield put(newTournamentSubmitStart())

  const newTournamentTimeout = 5000
  try {
    const tournamentData = action.tournamentData
    const result = yield race({
      data: call(submitNewTournament, tournamentData),
      timeout: delay(newTournamentTimeout)
    })

    if (result.data instanceof Error) {
      throw result.data
    }

    if (!result.timeout) {
      yield put(newTournamentSubmitSuccess(result.data))

      const adminQueryParam =
        new URLSearchParams({ admin: result.data.adminLink })
          .toString()

      console.log(adminQueryParam)

      history.push({
        pathname: `/t/${result.data.publicLink}`,
        search: `?${adminQueryParam}`
      })
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

export function * loadTournamentSaga () {
  yield put(loadTournamentStart())
  try {
    const query = new URLSearchParams(history.location.search)
    const adminId = query.get('admin')
    const publicLink = getTournamentPublicLink()

    const getTournamentTimeout = 5000

    const result = yield race({
      data: call(loadTournament, publicLink, adminId),
      timeout: delay(getTournamentTimeout)
    })

    if (result.data instanceof Error) {
      throw result.data
    }

    if (!result.timeout) {
      yield put(loadTournamentSuccess(result.data))
    } else {
      console.log('timeout')
      yield put(loadTournamentFail('timeout'))
    }
  } catch (error) {
    yield put(loadTournamentFail(error))
  }
}

export function * startTournamentSaga () {
  yield put(startTournamentStart())
  try {
    const publicLink = getTournamentPublicLink()
    console.log(publicLink)

    const startTournamentTimeout = 5000
    const { participantsInputValue } = (yield select()).tournament
    const participantsArray = getParticipantsArray(participantsInputValue)
    console.log(participantsInputValue)

    const result = yield race({
      data: call(startTournament, publicLink, participantsArray),
      timeout: delay(startTournamentTimeout)
    })

    console.log(result.data)

    if (result.data instanceof Error) {
      throw result.data
    }

    if (!result.timeout) {
      yield put(startTournamentSuccess(result.data))
    } else {
      console.log('timeout')
      yield put(startTournamentFail('timeout'))
    }
  } catch (error) {
    yield put(startTournamentFail(error))
  }
}
