import React from 'react'
import { Container, makeStyles, Card } from '@material-ui/core'
import AdminPanel from '../components/Tournament/AdminPanel'
import TournamentInfo from '../components/Tournament/TounamentInfo'
import Bracket from '../components/Tournament/Bracket'

const mockInfo = {
  name: 'TURNIEJ SWIATA',
  host: 'pudzian',
  description: 'dla najlepszych graczy swiata zapraszamy. dla najlepszych graczy swiata zapraszamy. dla najlepszych graczy swiata zapraszamy. dla najlepszych graczy swiata zapraszamy. dla najlepszych graczy swiata zapraszamy. dla najlepszych graczy swiata zapraszamy. dla najlepszych graczy swiata zapraszamy. dla najlepszych graczy swiata zapraszamy. dla najlepszych graczy swiata zapraszamy. dla najlepszych graczy swiata zapraszamy. dla najlepszych graczy swiata zapraszamy. dla najlepszych graczy swiata zapraszamy. dla najlepszych graczy swiata zapraszamy.',
  contact: 'firma@pudzian.pl',
  format: 'single elimination'
}

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '2rem'
  },
  root: {
    marginTop: '5rem',
    textAlign: 'center'
  },
}))

export default function TopBar (props) {
  const classes = useStyles()

  // const isInAdminMode = props.admin
  const isInAdminMode = true

  return (
    <div className={classes.root}>
      <Container maxWidth='lg'>
        {isInAdminMode ? <AdminPanel /> : null}
        <Card variant='outlined' className={classes.card}>
          <TournamentInfo
            // name={props.name}
            // host={props.host}
            // description={props.description}
            // contact={props.contact}
            // format={props.format}
            name={mockInfo.name}
            host={mockInfo.host}
            description={mockInfo.description}
            contact={mockInfo.contact}
            format={mockInfo.format}
          />
          <Bracket />
        </Card>
      </Container>
    </div>
  )
}
