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

export function loadTournament () {
  return {
    type: tournamentActionTypes.LOAD_TOURNAMENT
  }
}

export function loadTournamentStart () {
  return {
    type: tournamentActionTypes.LOAD_TOURNAMENT_START
  }
}

export function loadTournamentSuccess (tournamentData) {
  return {
    type: tournamentActionTypes.LOAD_TOURNAMENT_SUCCESS,
    tournamentData
  }
}

export function loadTournamentFail (error) {
  return {
    type: tournamentActionTypes.LOAD_TOURNAMENT_FAIL,
    error
  }
}

export function participantInputChangeAction (value) {
  return {
    type: tournamentActionTypes.TOURNAMENT_PARTICIPANTS_INPUT_CHANGE,
    value
  }
}

export function drawBracketAction () {
  return {
    type: tournamentActionTypes.TOURNAMENT_DRAW_BRACKET
  }
}

export function startTournament () {
  return {
    type: tournamentActionTypes.START_TOURNAMENT
  }
}

export function startTournamentStart () {
  return {
    type: tournamentActionTypes.START_TOURNAMENT_START
  }
}

export function startTournamentSuccess (bracketData) {
  return {
    type: tournamentActionTypes.START_TOURNAMENT_SUCCESS,
    bracketData
  }
}

export function startTournamentFail (error) {
  return {
    type: tournamentActionTypes.START_TOURNAMENT_FAIL,
    error
  }
}
