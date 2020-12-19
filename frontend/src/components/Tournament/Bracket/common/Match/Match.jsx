import React from 'react'
import BracketParticipant from '../BracketParticipant'
import { Grid, makeStyles } from '@material-ui/core'
import ReportMatchResult from '../ReportMatchResult'
import useMatch from './useMatch'

const useStyles = makeStyles((theme) => ({
  matchPair: {
    display: 'inline-block',
    width: 200
  }
}))

const Match = React.forwardRef((props, ref) => {
  const {
    roundId,
    matchId,
    isFinal
  } = props

  const classes = useStyles()

  const {
    isClickable,
    isModalOpen,
    openModal,
    closeModal,
    isScoreReported,
    participant1,
    participant2
  } = useMatch(props)

  return (
    <Grid ref={ref} className={classes.matchPair} container direction='column'>
      <Grid item onClick={openModal}>
        <BracketParticipant
          isClickable={isClickable}
          participant={participant1}
          matchId={matchId}
          roundId={roundId}
          winner={participant1.score > participant2.score}
        />
      </Grid>
      <Grid item onClick={openModal}>
        <BracketParticipant
          isClickable={isClickable}
          participant={participant2}
          matchId={matchId}
          roundId={roundId}
          winner={participant2.score > participant1.score}
        />
      </Grid>
      <ReportMatchResult
        isOpen={isModalOpen}
        closeModal={closeModal}
        matchId={matchId}
        roundId={roundId}
        participant1={participant1}
        participant2={participant2}
        isFinal={isFinal}
        isScoreReported={isScoreReported()}
      />
    </Grid>
  )
})

export default React.memo(Match)
