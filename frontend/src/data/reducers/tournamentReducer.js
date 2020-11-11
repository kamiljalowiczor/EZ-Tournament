import { tournamentActionTypes } from '../../common/constants/actionTypes'
import { getAmountOfRounds } from '../../components/Tournament/Bracket/common/Utils/bracketMathUtils'
import { getParticipantsArray, populateRoundsArrayWithPlayers } from './utils/tournamentUtils'

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
    roundsAmount: 0,
    rounds: []
  },
  isRedirectedFromForm: false,
  submitError: undefined,
  isUrlAvailable: true,
  isUrlCheckInProgress: false,
  isSubmittingNewTournament: false,
  isLoading: false, // loadTournament
  loadingError: false,
  isStartingTournament: false,
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
    tournamentInfo: { ...action.tournamentData },
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
  console.log(action.tournamentData)

  return {
    ...state,
    isLoading: false,
    loadingError: false,
    tournamentInfo: action.tournamentData.info
  }
}

function loadTournamentFail (state, action) {
  return {
    ...state,
    isLoading: false,
    loadingError: action.error
  }
}

function startTournamentStart (state, action) {
  return {
    ...state,
    isStartingTournament: true,
    startTournamentError: false
  }
}

function startTournamentSuccess (state, action) {
  return {
    ...state,
    isStartingTournament: false,
    startTournamentError: false,
    bracket: {
      ...action.bracketData,
      roundsAmount: action.bracketData.rounds.length
    }
  }
}

function startTournamentFail (state, action) {
  return {
    ...state,
    isStartingTournament: false,
    startTournamentError: action.error
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
    case tournamentActionTypes.START_TOURNAMENT_START:
      return startTournamentStart(state, action)
    case tournamentActionTypes.START_TOURNAMENT_SUCCESS:
      return startTournamentSuccess(state, action)
    case tournamentActionTypes.START_TOURNAMENT_FAIL:
      return startTournamentFail(state, action)
    default:
      return state
  }
}
