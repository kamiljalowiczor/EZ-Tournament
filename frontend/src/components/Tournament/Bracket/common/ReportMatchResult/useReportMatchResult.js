import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { cleanReportFlags, reportMatchScore } from '../../../../../data/actions/tournament/tournamentActions'

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
    isFinal,
    isScoreReported
  } = props

  const { isReportingMatch, reportMatchError } = useSelector(state => state.tournament)

  const [isReadyToReport, setIsReadyToReport] = useState(participant1 && participant1.name && participant2 && participant2.name)
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)
  const [winner, setWinner] = useState(null)
  const [resultText, setResultText] = useState(`${t('tournament:draws')}`)
  const [dummyIsScoreReportedFlag, setDummyIsScoreReportedFlag] = useState(isScoreReported) // zeby modal sobie mogl spokojnie zniknac po sukcesie przy reporcie wyniku

  useEffect(() => {
    setIsReadyToReport(participant1 && participant1.name && participant2 && participant2.name)
    handleOnExited()
  }, [participant1, participant2, participant1.name, participant2.name, isOpen])

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
      handleResultUpdate(+value, +score2)
    }
  }

  const handleScore2Change = (e) => {
    const value = adjustScoreInput(e.target.value)

    if (value.length < 5) {
      setScore2(+value)
      handleResultUpdate(+score1, +value)
    }
  }

  const handleResultUpdate = (score1, score2) => {
    if (score1 > score2) {
      setResultText(`${t('tournament:winner')}: ${participant1.name}`)
      setWinner(participant1.name)
    } else if (score1 < score2) {
      setResultText(`${t('tournament:winner')}: ${participant2.name}`)
      setWinner(participant2.name)
    } else {
      setResultText(`${t('tournament:draws')}`)
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

  useEffect(() => {
    if (!reportMatchError) {
      handleClose()
    }
  }, [isReportingMatch, reportMatchError])

  const handleScoreReport = () => {
    const player1Data = getPlayerData(participant1, score1)
    const player2Data = getPlayerData(participant2, score2)

    dispatch(reportMatchScore(roundId, matchId, player1Data, player2Data, isFinal))
  }

  const handleClose = () => {
    if (!isReportingMatch) {
      closeModal()
    }
  }

  const handleOnExited = () => {
    setTimeout(() => {
      setScore1(0)
      setScore2(0)
      handleResultUpdate(score1, score2)
      // setReportResultText(null)
      dispatch(cleanReportFlags())
      setDummyIsScoreReportedFlag(isScoreReported)
    }, 250)
  }

  return {
    score1,
    score2,
    winner,
    resultText,
    isReadyToReport,
    isReportingMatch,
    reportMatchError,
    dummyIsScoreReportedFlag,
    // reportResultText,
    // reportResultTitle,
    handleScore1Change,
    handleScore2Change,
    handleScoreReport,
    handleClose,
    handleOnExited
  }
}
