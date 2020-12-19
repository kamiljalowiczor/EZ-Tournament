import { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { tournamentStatusTypes } from '../../../../../common/constants/tournamentStatus'

export default function useMatch (props) {
  const {
    roundId,
    matchId,
    participant1,
    participant2
  } = props

  const [isModalOpen, setModalOpen] = useState(false)
  const { rounds, progressStatus } = useSelector((state) => state.tournament.bracket)

  const isMatchInBracket = useCallback(() => {
    return rounds && rounds[roundId] && rounds[roundId].matches && rounds[roundId].matches[matchId]
  }, [rounds, roundId, matchId])

  const isScoreReported = useCallback(() => {
    return isMatchInBracket(roundId, matchId) && rounds[roundId].matches[matchId].isScoreReported
  }, [rounds, roundId, matchId])

  function getParticipant (slotPosition) {
    if (isMatchInBracket(roundId, matchId) &&
        rounds[roundId].matches[matchId].players &&
        rounds[roundId].matches[matchId].players[slotPosition]
    ) {
      return rounds[roundId].matches[matchId].players[slotPosition]
    }
    return {}
  }

  const isGoingToBeWalkover = useCallback(() => {
    const prevRoundId = roundId - 1
    // czy jest pierwsza runda || czy ma obu zawodnikow
    if (!rounds[prevRoundId] || (getParticipant(0).name && getParticipant(1).name)) {
      return false
    }
    const lastRoundUpperMatchId = matchId * 2
    const lastRoundLowerMatchId = (matchId + 0.5) * 2

    const lastRoundUpperMatch =
      rounds && rounds[prevRoundId] && rounds[prevRoundId].matches && rounds[prevRoundId].matches[lastRoundUpperMatchId]

    const lastRoundLowerMatch =
      rounds && rounds[prevRoundId] && rounds[prevRoundId].matches && rounds[prevRoundId].matches[lastRoundLowerMatchId]

    return lastRoundUpperMatch.isEmpty || lastRoundLowerMatch.isEmpty
  }, [participant1 && participant1.name, participant1 && participant2.name, roundId, matchId])

  const isClickable =
    (getParticipant(0).name || getParticipant(1).name) &&
    progressStatus === tournamentStatusTypes.IN_PROGRESS

  const openModal = () => {
    if (!isClickable) {
      return
    }
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return {
    isClickable,
    isGoingToBeWalkover,
    isModalOpen,
    openModal,
    closeModal,
    isScoreReported,
    participant1: getParticipant(0),
    participant2: getParticipant(1)
  }
}
