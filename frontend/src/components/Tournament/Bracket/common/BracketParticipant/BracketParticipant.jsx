import React, { useState, useEffect, useMemo } from 'react'
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
        backgroundColor: 'purple'
      }
    },
    '& $playerId': {
      backgroundColor: props.isHighlighted ? 'purple' : '#222'
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
  },
  rootHoverable: props => ({
    '&:hover': {
      cursor: props.isClickable ? 'pointer' : 'default',
      backgroundColor: props.isClickable ? theme.palette.grey[100] : 'initial',
      borderColor: props.isClickable ? 'purple !important' : 'initial'
    }
  }),
  rootHighlight: props => ({
    backgroundColor: props.isHighlighted ? theme.palette.grey[100] : 'initial',
    borderColor: props.isHighlighted ? 'purple !important' : 'initial'
  })
}))

function BracketParticipant (props) {
  const dispatch = useDispatch()
  const { participant, isClickable } = props

  const highlightedId = useSelector(state => state.tournament.bracketUI.highlightedId)

  const classes = useStyles({
    isClickable,
    isHighlighted: participant && participant.id === highlightedId,
    id: participant && participant.id
  })

  let participantId = String.fromCharCode(160)
  let participantName = ''
  let participantScore = ''
  let isHighlighted = false

  if (participant) {
    participantId = participant.id ? participant.id : String.fromCharCode(160)
    participantName = participant.name
    participantScore = participant.score
    isHighlighted = participant && participant.id === highlightedId
  }

  const rootClassname = `
    ${classes.root} 
    ${isClickable ? classes.rootHoverable + ' ' + classes.rootHoverablePlayerId : ''} 
    ${isHighlighted ? classes.rootHighlight + ' ' + classes.rootHoverablePlayerId : ''}
  `

  return (
    <Paper
      variant='outlined'
      square
      className={rootClassname}
      onMouseEnter={() => { dispatch(updatePlayerHighlightInBracket(participantId, true)) }}
      onMouseLeave={() => { dispatch(updatePlayerHighlightInBracket(participantId, false)) }}
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
