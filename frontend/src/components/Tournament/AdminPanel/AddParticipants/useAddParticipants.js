import { useDispatch, useSelector } from 'react-redux'
import {
  participantInputChangeAction,
  drawBracketAction,
  startTournament
} from '../../../../data/actions/tournament/tournamentActions'
import { getParticipantsArray } from '../../../../data/reducers/utils/tournamentUtils'

export default function useAddParticipants () {
  const dispatch = useDispatch()

  function onDrawBracketClick () {
    dispatch(drawBracketAction())
  }

  function onStartTournamentClick () {
    dispatch(startTournament())
  }

  function onParticipantsInputChange (e) {
    const value = e.target.value.replace(/,/g, '\n').replace(/\n\n/g, '\n')

    dispatch(participantInputChangeAction(value))
  }

  function getAmountOfEnteredParticipants () {
    const participantsInputValue = useSelector(state => state.tournament.participantsInputValue)
    return getParticipantsArray(participantsInputValue).length
  }

  return {
    onDrawBracketClick,
    onStartTournamentClick,
    onParticipantsInputChange,
    getAmountOfEnteredParticipants
  }
}
