import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Container, makeStyles, Card } from '@material-ui/core'
import AdminPanel from '../components/Tournament/AdminPanel'
import TournamentInfo from '../components/Tournament/TounamentInfo'
import SingleEliminationBracket from '../components/Tournament/Bracket/SingleEliminationBracket'
import useTournament from './useTournament'
import Spinner from '../components/Utils/Spinner'
import Tournament404 from '../components/Utils/Tournament404'
import { loadTournament } from '../data/actions/tournament/tournamentActions'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '2rem',
    marginBottom: '2rem'
  },
  root: {
    marginTop: '5rem',
    textAlign: 'center'
  }
}))

export default function Tournament (props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    // tournamentData,
    // setTournamentData,
    isLoading,
    isRedirectedFromForm,
    loadingError
    // getDataAfterRedirectFromForm
  } = useTournament()

  useEffect(() => {
    if (!isRedirectedFromForm) {
      dispatch(loadTournament())
    }
  }, [])

  let content = <Spinner />

  if (!isLoading || isRedirectedFromForm) {
    if (!loadingError) {
      content = (
        <Container maxWidth='lg' className={classes.root}>
          <Card variant='outlined' className={classes.card}>
            <TournamentInfo />
          </Card>
          <AdminPanel />
          <Card variant='outlined' className={classes.card}>
            <SingleEliminationBracket />
          </Card>
        </Container>
      )
    } else {
      content = <Tournament404 />
    }
  }

  return (
    <>
      {content}
    </>
  )
}
