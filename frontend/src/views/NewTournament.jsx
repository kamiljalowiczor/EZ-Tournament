import React from 'react'
import { Container, Typography, Card, makeStyles } from '@material-ui/core'
import NewTournamentForm from '../components/NewTournament/'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '5rem',
    textAlign: 'center'
  },
  card: {
    padding: '2rem'
  }
}))

export default function NewTournament () {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Container maxWidth='md' className={classes.root}>
      <Card variant='outlined' className={classes.card}>
        <Typography variant='h2'>
          {t('form:new-tournament')}
        </Typography>
        <Typography variant='h6'>
          {t('form:fill-form')}
        </Typography>
        <NewTournamentForm />
      </Card>
    </Container>
  )
}
