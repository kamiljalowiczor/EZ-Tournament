import React, { useEffect, Suspense } from 'react'
import { useDispatch } from 'react-redux'
import { Container, makeStyles, Card } from '@material-ui/core'
import AdminPanel from '../components/Tournament/AdminPanel'
import TournamentInfo from '../components/Tournament/TounamentInfo'
import useTournament from './useTournament'
import Spinner from '../components/Utils/Spinner'
import Tournament404 from '../components/Utils/Tournament404'
import { loadTournament } from '../data/actions/tournament/tournamentActions'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '2rem',
    marginBottom: '2rem'
  },
  tournamentInfoContainer: {
    maxHeight: '600px',
    overflowY: 'auto'
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
      const SingleEliminationBracket = React.lazy(() => import('../components/Tournament/Bracket/SingleEliminationBracket'))

      content = (
        <Container maxWidth='lg' className={classes.root}>
          <Card variant='outlined' className={`${classes.card} ${classes.tournamentInfoContainer}`}>
            <TournamentInfo />
          </Card>
          <AdminPanel />
          <Card variant='outlined' className={classes.card}>
            <Suspense fallback={<Spinner />}>
              <SingleEliminationBracket />
            </Suspense>
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
