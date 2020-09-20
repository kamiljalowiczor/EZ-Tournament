import React from 'react'
import BracketParticipant from './BracketParticipant'
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  item: {
    margin: '0.125rem 0'
  }
}))

export default function MatchPair (props) {
  const classes = useStyles()

  return (
    <div className={props.linetoId}>
      <Grid container direction='column'>
        <Grid item className={classes.item}>
          <BracketParticipant />
        </Grid>
        <Grid item className={classes.item}>
          <BracketParticipant />
        </Grid>
      </Grid>
    </div>
  )
}
