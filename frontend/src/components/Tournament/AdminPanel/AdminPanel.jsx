import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Grid, makeStyles, Card } from '@material-ui/core'
import Links from './Links'
import AddParticipants from './AddParticipants'
import { useTranslation } from 'react-i18next'
import history from '../../../history'
import { tournamentStatusTypes } from '../../../../../src/routes/tournaments/tournamentService'

const useStyles = makeStyles((theme) => ({
  panelItem: {
    padding: '0rem 2rem'
  },
  card: {
    marginBottom: '2rem',
    padding: '2rem'
  }
}))

export default function AdminPanel (props) {
  const { t } = useTranslation()
  const classes = useStyles()

  const {
    adminLink
  } = useSelector(state => state.tournament.tournamentInfo)
  const tournamentProgressStatus = useSelector(state => state.tournament.bracket.progressStatus)

  if (!adminLink) {
    return null
  }

  let leftSideContent = (
    <>
      <Typography variant='h5'>
        {t('tournament:in-progress')}
      </Typography>
      <Typography variant='body1'>
        {t('tournament:in-progress-message')}
      </Typography>
    </>
  )

  if (tournamentProgressStatus === tournamentStatusTypes.NOT_STARTED) {
    leftSideContent = <AddParticipants />
  } else if (tournamentProgressStatus === tournamentStatusTypes.FINISHED) {
    leftSideContent = (
      <>
        <Typography variant='body1'>
          {t('tournament:finished-message')}
        </Typography>
        <Typography variant='h5'>
          GG WP
        </Typography>
      </>
    )
  }

  return (
    <Card variant='outlined' className={classes.card}>
      <Typography
        align='center'
        variant='h4'
        style={{ marginBottom: '2rem' }}
      >
        {t('tournament:admin-panel')}
      </Typography>
      TODO: ZAPIS ZAWODNIKOW DO FIREBASEA, UZUPELNIONY O WSZYSTKIE TE GLUPOTY TAKIE TYPU ID I SCORE,
      WCZYTYWANIE TYCH ZAWODNIKOW Z BAZY DO INPUTA OD RAZU NA ZALADOWANIU,
      UPDATE SCOREOW,
      ZROBIENIE CHECK URLA Z BAZY
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
      >
        <Grid className={classes.panelItem} item md={6}>
          {leftSideContent}
        </Grid>
        <Grid className={classes.panelItem} item md={6}>
          <Links
            adminLink={history.location.pathname + history.location.search}
            participantLink={history.location.pathname}
          />
        </Grid>
      </Grid>
    </Card>
  )
}
