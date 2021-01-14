import React from 'react'
import BracketParticipant from '../../common/BracketParticipant'
import RoundMatches from './RoundMatches'
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  roundTab: {
    textAlign: 'center',
    padding: '0.5rem 0rem',
    width: '200px'
  }
}))

function RoundColumn (props) {
  const classes = useStyles()

  const {
    round,
    label,
    topMargin,
    matchesMargin,
    isWinner,
    winnerData,
    isFinal
  } = props

  let roundContent

  if (isWinner) {
    roundContent = (
      <BracketParticipant participant={winnerData} />
    )
  } else {
    roundContent = (
      <RoundMatches
        isFinal={isFinal}
        round={round}
        spaceBetweenMatches={matchesMargin}
      />
    )
  }

  return (
    <Grid style={{ minWidth: isWinner ? '202px' : '237px' }}>
      <div>
        <Paper variant='outlined' className={classes.roundTab}>
          <Typography>
            {label}
          </Typography>
        </Paper>
      </div>
      <Grid
        item
        container
      >
        <div style={{ marginTop: `${topMargin}px` }}>
          {roundContent}
        </div>
      </Grid>
    </Grid>
  )
}

export default React.memo(RoundColumn)
