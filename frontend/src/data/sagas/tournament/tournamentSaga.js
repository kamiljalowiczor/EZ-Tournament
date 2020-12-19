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
  updateBracketStart,
  updateBracketSuccess,
  updateBracketFail,
  reportMatchScoreStart,
  reportMatchScoreSuccess,
  reportMatchScoreFail
} from '../../actions/tournament/tournamentActions'
import { put, call, delay, race, select } from 'redux-saga/effects'
import {
  submitNewTournament,
  loadTournament,
  updateBracket,
  reportMatchScore
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
        new URLSearchParams({ admin: result.data.info.adminLink })
          .toString()

      history.push({
        pathname: `/t/${result.data.info.publicLink}`,
        search: `?${adminQueryParam}`
      })
      window.scrollTo(0, 0)
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
    const { isUrlAvailable } = yield call(loadTournament, action.url, null, true)

    isUrlAvailable
      ? yield put(newTournamentUrlChangeAvailable(action.url))
      : yield put(newTournamentUrlChangeNotAvailable('url taken'))
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

    console.log(result.data)

    if (!result.timeout) {
      yield put(loadTournamentSuccess(result.data))
    } else {
      yield put(loadTournamentFail('timeout'))
    }
  } catch (error) {
    yield put(loadTournamentFail(error))
  }
}

export function * updateBracketSaga ({ isStartTournamentRequest }) {
  yield put(updateBracketStart())
  try {
    const publicLink = getTournamentPublicLink()

    const updateBracketTimeout = 5000
    const { participantsInputValue } = (yield select()).tournament
    const participantsArray = getParticipantsArray(participantsInputValue)

    const result = yield race({
      data: call(updateBracket, publicLink, participantsArray, isStartTournamentRequest),
      timeout: delay(updateBracketTimeout)
    })

    if (result.data instanceof Error) {
      throw result.data
    }

    if (!result.timeout) {
      yield put(updateBracketSuccess(result.data))
    } else {
      yield put(updateBracketFail('timeout'))
    }
  } catch (error) {
    yield put(updateBracketFail(error))
  }
}

export function * reportMatchScoreSaga (action) {
  const {
    roundId,
    matchId,
    player1Data,
    player2Data,
    isFinal
  } = action

  yield put(reportMatchScoreStart())
  try {
    const publicLink = getTournamentPublicLink()

    const {
      winner,
      progressStatus,
      rounds
    } = yield call(reportMatchScore, publicLink, roundId, matchId, player1Data, player2Data, isFinal)

    yield put(reportMatchScoreSuccess(winner, progressStatus, rounds, roundId))
  } catch (error) {
    console.error(error)
    yield put(reportMatchScoreFail(error))
  }
}
