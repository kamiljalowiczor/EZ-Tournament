import { tournamentActionTypes } from '../../common/constants/actionTypes'
import { tournamentStatusTypes } from '../../common/constants/tournamentStatus'
import { getAmountOfRounds } from '../../components/Tournament/Bracket/common/Utils/bracketMathUtils'
import {
  getParticipantsArray,
  populateRoundsArrayWithPlayers,
  getRoundsArrayWithPlayerHighlights
} from './utils/tournamentUtils'
import produce from 'immer'

const initialState = {
  tournamentInfo: {
    name: undefined,
    description: undefined,
    host: undefined,
    contact: undefined,
    publicLink: undefined,
    adminLink: undefined
  },
  bracket: {
    progressStatus: tournamentStatusTypes.NOT_STARTED, // IN_PROGRESS, FINISHED
    participants: [],
    rounds: [],
    winner: {}
  },
  bracketUI: {
    highlightedId: null
  },
  isRedirectedFromForm: false,
  submitError: undefined,
  isUrlAvailable: true,
  isUrlCheckInProgress: false,
  isSubmittingNewTournament: false,
  isLoading: false, // loadTournament
  loadingError: false,
  isUpdatingBracket: false,
  updateError: false,
  participantsInputValue: ''
}

function newTournamentSubmitStart (state, action) {
  return {
    ...state,
    isSubmittingNewTournament: true,
    submitError: undefined
  }
}

function newTournamentSubmitSuccess (state, action) {
  return {
    ...state,
    tournamentInfo: {
      ...action.tournamentData.info
    },
    bracket: {
      ...action.tournamentData.bracket
    },
    isUrlAvailable: false,
    isSubmittingNewTournament: false,
    isRedirectedFromForm: true,
    isLoading: false
  }
}

function newTournamentSubmitFail (state, action) {
  return {
    ...state,
    submitError: action.error,
    isSubmittingNewTournament: false
  }
}

function urlChangeStart (state, action) {
  return {
    ...state,
    isUrlCheckInProgress: true
  }
}

function urlChangeAvailable (state, action) {
  return {
    ...state,
    isUrlCheckInProgress: false,
    isUrlAvailable: true
  }
}

function urlChangeNotAvailable (state, action) {
  return {
    ...state,
    isUrlCheckInProgress: false,
    isUrlAvailable: false
  }
}

function participantsInputChange (state, action) {
  const { value } = action

  if (getParticipantsArray(value).length > 256) {
    return {
      ...state
    }
  }

  return {
    ...state,
    participantsInputValue: value
  }
}

function drawBracket (state, action) {
  const participantsArray = getParticipantsArray(state.participantsInputValue)
  const roundsAmount = getAmountOfRounds(participantsArray.length)
  const rounds = populateRoundsArrayWithPlayers(participantsArray, roundsAmount)

  const bracket = {
    roundsAmount,
    rounds
  }

  return {
    ...state,
    bracket
  }
}

function loadTournamentStart (state, action) {
  return {
    ...state,
    isLoading: true,
    loadingError: false
  }
}

function loadTournamentSuccess (state, action) {
  const data = action.tournamentData
  let bracket = data.bracket
  let rounds = bracket.rounds
  let participants = bracket.participants

  console.log(data)

  if (!data.bracket.rounds) {
    rounds = []
  }
  if (!data.bracket.participants) {
    participants = []
  }

  bracket = {
    ...bracket,
    rounds,
    participants
  }

  return {
    ...state,
    isLoading: false,
    loadingError: false,
    tournamentInfo: data.info,
    bracket,
    participantsInputValue: participants.join(', ').replace(/(, [^, ]*), /g, '$1\n')
  }
}

function loadTournamentFail (state, action) {
  return {
    ...state,
    isLoading: false,
    loadingError: action.error
  }
}

function updateBracketStart (state, action) {
  return {
    ...state,
    isUpdatingBracket: true,
    updateError: false
  }
}

function updateBracketSuccess (state, action) {
  return {
    ...state,
    isUpdatingBracket: false,
    updateError: false,
    bracket: {
      ...action.bracketData,
      roundsAmount: action.bracketData.rounds.length
    }
  }
}

function updateBracketFail (state, action) {
  return {
    ...state,
    isUpdatingBracket: false,
    updateError: action.error
  }
}

function reportMatchStart (state, action) {
  return {
    ...state
  }
}

function reportMatchSuccess (state, action) {
  const {
    winner,
    nextRoundId,
    nextMatchId,
    nextMatchPlayerSlot,
    prevRoundId,
    prevMatchId,
    reportedPlayer1Data,
    reportedPlayer2Data
  } = action

  const rounds = produce(state.bracket.rounds, draft => {
    draft[nextRoundId].matches[nextMatchId].players[nextMatchPlayerSlot] = winner

    draft[prevRoundId].matches[prevMatchId].players[0] = reportedPlayer1Data
    draft[prevRoundId].matches[prevMatchId].players[1] = reportedPlayer2Data
  })

  return {
    ...state,
    bracket: {
      ...state.bracket,
      rounds
    }
  }
}

function reportMatchEndTournament (state, action) {
  const {
    winner,
    progressStatus
  } = action

  return {
    ...state,
    bracket: {
      ...state.bracket,
      progressStatus,
      winner
    }
  }
}

function reportMatchFail (state, action) {
  return {
    ...state
  }
}

function updatePlayerHighlightInBracket (state, action) {
  const {
    participantId,
    shouldHighlight
  } = action

  return {
    ...state,
    bracketUI: {
      ...state.bracketUI,
      highlightedId: shouldHighlight ? participantId : null
    }
  }
}

export default function tournament (state = initialState, action) {
  switch (action.type) {
    case tournamentActionTypes.NEW_TOURNAMENT_SUBMIT_START:
      return newTournamentSubmitStart(state, action)
    case tournamentActionTypes.NEW_TOURNAMENT_SUBMIT_SUCCESS:
      return newTournamentSubmitSuccess(state, action)
    case tournamentActionTypes.NEW_TOURNAMENT_SUBMIT_FAIL:
      return newTournamentSubmitFail(state, action)
    case tournamentActionTypes.NEW_TOURNAMENT_URL_CHANGE_START:
      return urlChangeStart(state, action)
    case tournamentActionTypes.NEW_TOURNAMENT_URL_CHANGE_AVAILABLE:
      return urlChangeAvailable(state, action)
    case tournamentActionTypes.NEW_TOURNAMENT_URL_CHANGE_NOT_AVAILABLE:
      return urlChangeNotAvailable(state, action)
    case tournamentActionTypes.TOURNAMENT_PARTICIPANTS_INPUT_CHANGE:
      return participantsInputChange(state, action)
    case tournamentActionTypes.TOURNAMENT_DRAW_BRACKET:
      return drawBracket(state, action)
    case tournamentActionTypes.LOAD_TOURNAMENT_START:
      return loadTournamentStart(state, action)
    case tournamentActionTypes.LOAD_TOURNAMENT_SUCCESS:
      return loadTournamentSuccess(state, action)
    case tournamentActionTypes.LOAD_TOURNAMENT_FAIL:
      return loadTournamentFail(state, action)
    case tournamentActionTypes.UPDATE_BRACKET_START:
      return updateBracketStart(state, action)
    case tournamentActionTypes.UPDATE_BRACKET_SUCCESS:
      return updateBracketSuccess(state, action)
    case tournamentActionTypes.UPDATE_BRACKET_FAIL:
      return updateBracketFail(state, action)
    case tournamentActionTypes.REPORT_MATCH_SCORE_START:
      return reportMatchStart(state, action)
    case tournamentActionTypes.REPORT_MATCH_SCORE_SUCCESS:
      return reportMatchSuccess(state, action)
    case tournamentActionTypes.REPORT_MATCH_SCORE_END_TOURNAMENT:
      return reportMatchEndTournament(state, action)
    case tournamentActionTypes.REPORT_MATCH_SCORE_FAIL:
      return reportMatchFail(state, action)
    case tournamentActionTypes.UPDATE_PLAYER_HIGHLIGHT_IN_BRACKET:
      return updatePlayerHighlightInBracket(state, action)
    default:
      return state
  }
}
