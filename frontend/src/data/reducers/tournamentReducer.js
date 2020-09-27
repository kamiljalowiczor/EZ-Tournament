import { tournamentActionTypes } from '../../common/constants/actionTypes'

const initialState = {
  id: undefined,
  name: undefined,
  format: undefined,
  description: undefined,
  host: undefined,
  contact: undefined,
  publicLink: undefined,
  adminLink: undefined,
  submitError: undefined,
  isUrlAvailable: true,
  isUrlCheckInProgress: false,
  isSubmittingNewTournament: false,
  isLoading: false // TODO na ladowanie w sensie zeby wpisac link do przegladarki i sie ma ladowac, saga loadTournament i w ogole
}

function newTournamentSubmitStart (state, action) {
  return {
    ...state,
    isSubmittingNewTournament: true,
    submitError: undefined
  }
}

function newTournamentSubmitSuccess (state, action) {
  const {
    id,
    name,
    format,
    descrption,
    host,
    contact
  } = action.tournamentData

  return {
    ...state,
    id,
    name,
    format,
    descrption,
    host,
    contact,
    isUrlAvailable: false,
    isSubmittingNewTournament: false
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

export default function tournament (state = initialState, action) {
  switch (action.type) {
    case tournamentActionTypes.NEW_TOURNAMENT_START:
      return newTournamentSubmitStart(state, action)
    case tournamentActionTypes.NEW_TOURNAMENT_SUCCESS:
      return newTournamentSubmitSuccess(state, action)
    case tournamentActionTypes.NEW_TOURNAMENT_FAIL:
      return newTournamentSubmitFail(state, action)
    case tournamentActionTypes.NEW_TOURNAMENT_URL_CHANGE_START:
      return urlChangeStart(state, action)
    case tournamentActionTypes.NEW_TOURNAMENT_URL_CHANGE_AVAILABLE:
      return urlChangeAvailable(state, action)
    case tournamentActionTypes.NEW_TOURNAMENT_URL_CHANGE_NOT_AVAILABLE:
      return urlChangeNotAvailable(state, action)
    default:
      return state
  }
}
