import React from 'react'
import { Paper, makeStyles, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { updatePlayerHighlightInBracket } from '../../../../../data/actions/tournament/tournamentActions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 200,
    height: 30,
    border: '1px solid rgba(0, 0, 0, 0.87) !important'
  },
  rootHoverablePlayerId: props => ({
    '&:hover': {
      '& $playerId': {
        backgroundColor: theme.palette.primary.main
      }
    },
    '& $playerId': {
      backgroundColor: props.isHighlighted ? theme.palette.primary.main : '#222'
    }
  }),
  fontSize: {
    fontSize: '12.5px !important'
  },
  playerName: {
    flex: 1
  },
  playerId: props => ({
    backgroundColor: '#222',
    color: props.id ? 'white' : '#222'
  }),
  score: props => ({
    backgroundColor: '#333',
    color: props.winner ? theme.palette.primary.main : theme.palette.secondary.main
  }),
  participantNumbers: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px',
    height: '100%'
  },
  rootHoverable: props => ({
    '&:hover': {
      cursor: props.isClickable ? 'pointer' : 'default',
      borderColor: props.isClickable ? `${theme.palette.secondary.main}` : 'initial'
    }
  }),
  rootHighlight: props => ({
    borderColor: props.isHighlighted ? `${theme.palette.secondary.main} !important` : 'initial'
  })
}))

function BracketParticipant (props) {
  const dispatch = useDispatch()
  const { participant, isClickable, winner } = props

  const highlightedId = useSelector(state => state.tournament.bracketUI.highlightedId)

  let participantId = ''
  let participantName = ''
  let participantScore = ''
  let isHighlighted = false

  if (participant) {
    participantId = participant.id ? participant.id : String.fromCharCode(160)
    participantName = participant.name
    participantScore = participant.score
    isHighlighted = participant && participant.id === highlightedId
  }

  const classes = useStyles({
    winner,
    isClickable,
    isHighlighted: participantId === highlightedId,
    id: participantId
  })

  const rootClassname = `
    ${classes.root} 
    ${isClickable ? classes.rootHoverable + ' ' + classes.rootHoverablePlayerId : ''} 
    ${isHighlighted ? classes.rootHighlight + ' ' + classes.rootHoverablePlayerId : ''}
  `

  function onHighlightAction (shouldHighlight) {
    if (participant && participant.id) {
      dispatch(updatePlayerHighlightInBracket(participantId, shouldHighlight))
    }
  }

  return (
    <Paper
      variant='outlined'
      square
      className={rootClassname}
      onMouseEnter={() => { onHighlightAction(true) }}
      onMouseLeave={() => { onHighlightAction(false) }}
    >
      <Typography
        className={`${classes.participantNumbers} ${classes.playerId} ${classes.fontSize}`}
      >
        {participantId}
      </Typography>
      <Typography
        className={`${classes.playerName} ${classes.fontSize}`}
      >
        {participantName}
      </Typography>
      <Typography
        className={`${classes.participantNumbers} ${classes.score} ${classes.fontSize}`}
      >
        {participantScore}
      </Typography>
    </Paper>
  )
}

export default BracketParticipant
