import React from 'react'
import BracketParticipant from '../BracketParticipant'
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  matchPair: {
    display: 'inline-block',
    width: 200
  }
}))

const Match = React.forwardRef((props, ref) => {
  const classes = useStyles()

  return (
    <Grid ref={ref} className={classes.matchPair} container direction='column'>
      <Grid item>
        <BracketParticipant />
      </Grid>
      <Grid item>
        <BracketParticipant />
      </Grid>
    </Grid>
  )
})

export default Match
