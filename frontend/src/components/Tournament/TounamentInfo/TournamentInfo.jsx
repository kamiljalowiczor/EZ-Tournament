import React from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '2rem',
    padding: '2rem'
  },
  mb2: {
    marginBottom: '2rem'
  },
  mb05: {
    marginBottom: '0.5rem'
  },
  description: {
    maxWidth: '800px'
  }
}))

export default function TournamentInfo (props) {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Grid className={classes.mb2} container item direction='column'>
        <Typography variant='h4'>
          {props.name}
        </Typography>
        <Typography className={classes.mb2} variant='h6'>
          {props.format}
        </Typography>
        <Typography variant='body1'>
          Hosted by: {props.host}
        </Typography>
        <Typography variant='body1'>
          Contact: {props.contact}
        </Typography>
      </Grid>
      <Grid className={classes.item} container item direction='column' alignItems='center'>
        <Typography className={classes.description} align='left' variant='body1'>
          {props.description}
        </Typography>
      </Grid>
    </Grid>
  )
}
