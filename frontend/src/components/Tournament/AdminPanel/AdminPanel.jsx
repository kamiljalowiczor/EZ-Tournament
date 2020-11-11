import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Grid, makeStyles, Card } from '@material-ui/core'
import Links from './Links'
import AddParticipants from './AddParticipants'
import { useTranslation } from 'react-i18next'
import history from '../../../history'

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

  if (!adminLink) {
    return null
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
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
      >
        <Grid className={classes.panelItem} item md={7}>
          <AddParticipants />
        </Grid>
        <Grid className={classes.panelItem} item md={5}>
          <Links
            adminLink={history.location.pathname + history.location.search}
            participantLink={history.location.pathname}
          />
        </Grid>
      </Grid>
    </Card>
  )
}
