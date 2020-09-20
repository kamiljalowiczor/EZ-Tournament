import React from 'react'
import { Paper, IconButton, InputBase, Input, Divider, makeStyles, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import DirectionsIcon from '@material-ui/icons/Directions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 200,
    height: 30,
    border: '1px solid rgba(0, 0, 0, 0.87) !important',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.grey[100],
      borderColor: 'purple !important',
      '& $playerId': {
        backgroundColor: 'purple'
      }
    }
  },
  fontSize: {
    fontSize: '12.5px !important'
  },
  playerName: {
    flex: 1
  },
  playerId: {
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
    color: 'white'
  },
  score: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: 'purple'
  },
  participantNumbers: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px',
    height: '100%'
  }
}))

export default function BracketParticipant () {
  const classes = useStyles()

  return (
    <Paper variant='outlined' square className={classes.root}>
      <Typography
        className={`${classes.participantNumbers} ${classes.playerId} ${classes.fontSize}`}
      >
        127
      </Typography>
      <Typography className={`${classes.playerName} ${classes.fontSize}`}>pudzian997pl</Typography>
      <Typography
        className={`${classes.participantNumbers} ${classes.score} ${classes.fontSize}`}
      >
        2
      </Typography>
    </Paper>
  )
}
