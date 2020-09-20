import React from 'react'
import { Typography, Grid, makeStyles, Card } from '@material-ui/core'
import Links from './Links'
import AddParticipants from './AddParticipants'

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
  const classes = useStyles()

  return (
    <Card variant='outlined' className={classes.card}>
      <Typography
        align='center'
        variant='h4'
        style={{ marginBottom: '2rem' }}
      >
        ADMIN PANEL
      </Typography>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
      >
        <Grid className={classes.panelItem} item md={8}>
          <AddParticipants />
        </Grid>
        <Grid className={classes.panelItem} item md={4}>
          <Links
            adminLink='witamAdmina'
            participantLink='witamParticipant'
          />
        </Grid>
      </Grid>
    </Card>
  )
}
