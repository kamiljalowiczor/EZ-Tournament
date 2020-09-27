import { tournamentActionTypes } from '../../../common/constants/actionTypes'

export function newTournamentSubmit (tournamentData) {
  return {
    type: tournamentActionTypes.NEW_TOURNAMENT_SUBMIT,
    tournamentData
  }
}

export function newTournamentSubmitStart () {
  return {
    type: tournamentActionTypes.NEW_TOURNAMENT_SUBMIT_START
  }
}

export function newTournamentSubmitSuccess (tournamentData) {
  return {
    type: tournamentActionTypes.NEW_TOURNAMENT_SUBMIT_SUCCESS,
    tournamentData
  }
}

export function newTournamentSubmitFail (error) {
  return {
    type: tournamentActionTypes.NEW_TOURNAMENT_SUBMIT_FAIL,
    error
  }
}

export function newTournamentUrlChange (url) {
  return {
    type: tournamentActionTypes.NEW_TOURNAMENT_URL_CHANGE,
    url
  }
}

export function newTournamentUrlChangeStart () {
  return {
    type: tournamentActionTypes.NEW_TOURNAMENT_URL_CHANGE_START
  }
}

export function newTournamentUrlChangeAvailable (url) {
  return {
    type: tournamentActionTypes.NEW_TOURNAMENT_URL_CHANGE_AVAILABLE,
    url: url
  }
}

export function newTournamentUrlChangeNotAvailable () {
  return {
    type: tournamentActionTypes.NEW_TOURNAMENT_URL_CHANGE_NOT_AVAILABLE
  }
}
