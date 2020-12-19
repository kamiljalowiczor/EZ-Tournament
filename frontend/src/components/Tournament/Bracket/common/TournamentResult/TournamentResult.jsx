import React from 'react'
import { Grid, Card, makeStyles, Typography } from '@material-ui/core'
import PlayerResult from './PlayerResult'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  card: props => ({
    margin: '2rem 1rem',
    padding: props.isTwoThirdPlacePlayers ? '2rem' : '2rem 2rem 0rem 2rem'
  })
}))

const TournamentResult = props => {
  const { t } = useTranslation()

  const {
    winner,
    secondPlace,
    thirdPlacePlayer1,
    thirdPlacePlayer2
  } = props

  const classes = useStyles({
    isTwoThirdPlacePlayers: !!thirdPlacePlayer2
  })

  const isThirdPlacePlayer = thirdPlacePlayer1 || thirdPlacePlayer2

  return (
    <Card variant='outlined' className={classes.card}>
      <Typography variant='h5'>
        {t('tournament:final-results')}
      </Typography>
      <br />
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='flex-end'
      >
        <Grid item xs={3}>
          <PlayerResult playerName={secondPlace} color='silver' size='3x' />
        </Grid>
        <Grid item xs={3}>
          <PlayerResult playerName={winner} color='gold' size='4x' />
        </Grid>
        <Grid item xs={3}>
          {
            isThirdPlacePlayer &&
              <PlayerResult
                playerName={thirdPlacePlayer1}
                secondPlayerName={thirdPlacePlayer1 === thirdPlacePlayer2 ? null : thirdPlacePlayer2}
                color='#cd7f32'
                size='2x'
              />
          }
        </Grid>
      </Grid>
    </Card>
  )
}

export default React.memo(TournamentResult)
