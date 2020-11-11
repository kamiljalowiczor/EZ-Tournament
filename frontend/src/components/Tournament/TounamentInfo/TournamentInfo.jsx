import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {
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
  const { t } = useTranslation()

  const {
    tournamentInfo
  } = useSelector((state) => state.tournament)

  let name = null
  let host = null
  let contact = null
  let description = null

  if (tournamentInfo.name) {
    name = (
      <Typography variant='h4'>
        {tournamentInfo.name}
      </Typography>
    )
  }

  if (tournamentInfo.host) {
    host = (
      <Typography variant='body1'>
        {t('tournament:hosted-by')} {tournamentInfo.host}
      </Typography>
    )
  }

  if (tournamentInfo.contact) {
    contact = (
      <Typography variant='body1'>
        {t('tournament:contact')} {tournamentInfo.contact}
      </Typography>
    )
  }

  if (tournamentInfo.description) {
    description = (
      <Typography className={classes.description} align='left' variant='body1'>
        {tournamentInfo.description}
      </Typography>
    )
  }
  return (
    <Grid container className={classes.root}>
      <Grid className={description ? classes.mb2 : ''} container item direction='column'>
        {name}
        {host}
        {contact}
      </Grid>
      <Grid className={classes.item} container item direction='column' alignItems='center'>
        {description}
      </Grid>
    </Grid>
  )
}
