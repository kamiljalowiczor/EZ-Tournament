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

export function updateBracket (isStartTournamentRequest) {
  return {
    type: tournamentActionTypes.UPDATE_BRACKET,
    isStartTournamentRequest
  }
}

export function updateBracketStart () {
  return {
    type: tournamentActionTypes.UPDATE_BRACKET_START
  }
}

export function updateBracketSuccess (bracketData) {
  return {
    type: tournamentActionTypes.UPDATE_BRACKET_SUCCESS,
    bracketData
  }
}

export function updateBracketFail (error) {
  return {
    type: tournamentActionTypes.UPDATE_BRACKET_FAIL,
    error
  }
}

export function reportMatchScore (roundId, matchId, player1Data, player2Data, isFinal) {
  return {
    type: tournamentActionTypes.REPORT_MATCH_SCORE,
    roundId,
    matchId,
    player1Data,
    player2Data,
    isFinal
  }
}

export function reportMatchScoreStart () {
  return {
    type: tournamentActionTypes.REPORT_MATCH_SCORE_START
  }
}

export function reportMatchScoreSuccess (winner, nextRoundId, nextMatchId, nextMatchPlayerSlot, prevRoundId, prevMatchId, reportedPlayer1Data, reportedPlayer2Data) {
  return {
    type: tournamentActionTypes.REPORT_MATCH_SCORE_SUCCESS,
    winner,
    nextRoundId,
    nextMatchId,
    nextMatchPlayerSlot,
    prevRoundId,
    prevMatchId,
    reportedPlayer1Data,
    reportedPlayer2Data
  }
}

export function reportMatchScoreEndTournament (winner, progressStatus) {
  return {
    type: tournamentActionTypes.REPORT_MATCH_SCORE_END_TOURNAMENT,
    progressStatus,
    winner
  }
}

export function reportMatchScoreFail (error) {
  return {
    type: tournamentActionTypes.REPORT_MATCH_SCORE_FAIL,
    error
  }
}

export function updatePlayerHighlightInBracket (participantId, shouldHighlight) {
  return {
    type: tournamentActionTypes.UPDATE_PLAYER_HIGHLIGHT_IN_BRACKET,
    participantId,
    shouldHighlight
  }
}
