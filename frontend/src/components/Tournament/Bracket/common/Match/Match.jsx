import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import BracketParticipant from '../BracketParticipant'
import { Grid, makeStyles } from '@material-ui/core'
import ReportMatchResult from '../ReportMatchResult'
import { tournamentStatusTypes } from '../../../../../common/constants/tournamentStatus'

const useStyles = makeStyles((theme) => ({
  matchPair: {
    display: 'inline-block',
    width: 200
  }
}))

const Match = React.forwardRef((props, ref) => {
  const classes = useStyles()
  const [isModalOpen, setModalOpen] = useState(false)

  const { rounds, progressStatus } = useSelector((state) => state.tournament.bracket)

  let participant1 = {}
  let participant2 = {}

  const roundId = props.roundId
  const matchId = props.matchId

  if (rounds && rounds[roundId] && rounds[roundId].matches && rounds[roundId].matches[matchId] && rounds[roundId].matches[matchId].players && rounds[roundId].matches[matchId].players[0]) {
    participant1 = rounds[roundId].matches[matchId].players[0]

    if (rounds[roundId].matches[matchId].players[1]) {
      participant2 = rounds[roundId].matches[matchId].players[1]
    }
  }

  console.log('mecz render')

  const isClickable = (participant1.name || participant2.name) && progressStatus !== tournamentStatusTypes.NOT_STARTED
  // jeszcze warunek jakis ze score juz jest zareportowany

  const openModal = () => {
    if (!isClickable) {
      return
    }
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <Grid ref={ref} className={classes.matchPair} container direction='column'>
      <Grid item onClick={openModal}>
        <BracketParticipant
          isClickable={isClickable}
          participant={participant1}
          matchId={props.matchId}
          roundId={props.roundId}
        />
      </Grid>
      <Grid item onClick={openModal}>
        <BracketParticipant
          isClickable={isClickable}
          participant={participant2}
          matchId={props.matchId}
          roundId={props.roundId}
        />
      </Grid>
      <ReportMatchResult
        isOpen={isModalOpen}
        closeModal={closeModal}
        matchId={props.matchId}
        roundId={props.roundId}
        participant1={participant1}
        participant2={participant2}
        isFinal={props.isFinal}
      />
    </Grid>
  )
})

export default React.memo(Match)
