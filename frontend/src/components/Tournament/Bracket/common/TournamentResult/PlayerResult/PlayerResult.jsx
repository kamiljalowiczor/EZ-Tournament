import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

const PlayerResult = props => {
  const {
    playerName,
    secondPlayerName,
    color,
    size
  } = props

  return (
    <div>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
      >
        <FontAwesomeIcon icon={faTrophy} color={color} size={size} />
        <span style={{ marginBottom: '0.1rem' }} />
        <Typography variant='h6'>
          {playerName}
        </Typography>
        <Typography variant='h6'>
          {secondPlayerName || String.fromCharCode(160)}
        </Typography>
      </Grid>
    </div>
  )
}

export default React.memo(PlayerResult)
