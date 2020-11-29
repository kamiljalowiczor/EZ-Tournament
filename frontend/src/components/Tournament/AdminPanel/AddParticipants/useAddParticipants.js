import { useDispatch, useSelector } from 'react-redux'
import {
  participantInputChangeAction,
  updateBracket
} from '../../../../data/actions/tournament/tournamentActions'
import { getParticipantsArray } from '../../../../data/reducers/utils/tournamentUtils'

export default function useAddParticipants () {
  const dispatch = useDispatch()

  function onAddParticipantsClick () {
    dispatch(updateBracket(false))
  }

  function onStartTournamentClick () {
    dispatch(updateBracket(true))
  }

  function onParticipantsInputChange (e) {
    const value = e.target.value.replace(/\n\n/g, '\n')
    dispatch(participantInputChangeAction(value))
  }

  function getAmountOfEnteredParticipants () {
    const participantsInputValue = useSelector(state => state.tournament.participantsInputValue)
    return getParticipantsArray(participantsInputValue).length
  }

  const participantsInputValue = useSelector(state => state.tournament.participantsInputValue)

  return {
    onAddParticipantsClick,
    onStartTournamentClick,
    onParticipantsInputChange,
    getAmountOfEnteredParticipants,
    participantsInputValue
  }
}
