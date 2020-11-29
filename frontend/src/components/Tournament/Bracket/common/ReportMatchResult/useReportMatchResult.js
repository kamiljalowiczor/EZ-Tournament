import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { reportMatchScore } from '../../../../../data/actions/tournament/tournamentActions'
import { set } from 'lodash'

export default function useReportMatchResult (props) {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const {
    participant1,
    participant2,
    roundId,
    matchId,
    closeModal,
    isOpen,
    isFinal
  } = props

  const getScoreForParticipant = (participant) => {
    return participant.score ? participant.score : 0
  }

  const [isWalkover, setIsWalkover] = useState(!participant1.name || !participant2.name)
  const [score1, setScore1] = useState(isWalkover ? 'w/o' : getScoreForParticipant(participant1))
  const [score2, setScore2] = useState(isWalkover ? ' ' : getScoreForParticipant(participant2))
  const [winner, setWinner] = useState(
    isWalkover
      ? participant1.name
        ? participant1.name
        : participant2.name
      : null
  )
  const [resultText, setResultText] = useState(isWalkover ? t('tournament:walkover', { winner }) : '')

  useEffect(() => {
    setIsWalkover(!participant1.name || !participant2.name)
    setScore1(isWalkover ? 'w/o' : getScoreForParticipant(participant1))
    setScore2(isWalkover ? 'w/o' : getScoreForParticipant(participant2))
    updateResultUI(score1, score2)
  }, [participant1, participant2, participant1.name, participant2.name, participant1.score, participant2.score, isOpen])

  const adjustScoreInput = (value) => {
    value = value.replace(/[^\d]/, '')

    while (value.charAt(0) === '0' && value !== '0') {
      value = value.substring(1)
    }

    return value
  }

  const handleScore1Change = (e) => {
    const value = adjustScoreInput(e.target.value)

    if (value.length < 5) {
      setScore1(+value)
      updateResultUI(+value, +score2)
    }
  }

  const handleScore2Change = (e) => {
    const value = adjustScoreInput(e.target.value)

    if (value.length < 5) {
      setScore2(+value)
      updateResultUI(+score1, +value)
    }
  }

  const updateResultUI = (score1, score2) => {
    if (isWalkover) {
      setResultText(`${t('tournament:walkover', { winner })}`)
      setWinner(isWalkover
        ? participant1.name
          ? participant1.name
          : participant2.name
        : null)
      return
    }

    if (score1 > score2) {
      setResultText(`${t('tournament:winner')}: ${participant1.name}`)
      setWinner(participant1.name)
    } else if (score1 < score2) {
      setResultText(`${t('tournament:winner')}: ${participant2.name}`)
      setWinner(participant2.name)
    } else {
      setResultText(t('tournament:draws'))
      setWinner(null)
    }
  }

  const getPlayerData = (participant, score) => {
    return {
      score,
      name: participant.name,
      id: participant.id
    }
  }

  const handleScoreReport = () => {
    const player1Data = getPlayerData(participant1, score1)
    const player2Data = getPlayerData(participant2, score2)

    dispatch(reportMatchScore(roundId, matchId, player1Data, player2Data, isFinal))

    // w sumie moze jeszcze jakies spinnery i takie tam w tym modalu przed zamknieciem

    handleClose()
  }

  const handleClose = () => {
    // handelklouz musi byc odpalane tylko wtedy gdy user wyjdzie na blurze!!
    closeModal()
    setScore1(getScoreForParticipant(participant1))
    setScore2(getScoreForParticipant(participant2))
    setWinner(
      isWalkover
        ? participant1.name
          ? participant1.name
          : participant2.name
        : null
    )
  }

  return {
    score1,
    score2,
    winner,
    resultText,
    isWalkover,
    handleScore1Change,
    handleScore2Change,
    updateResultUI,
    handleScoreReport,
    handleClose
  }
}
