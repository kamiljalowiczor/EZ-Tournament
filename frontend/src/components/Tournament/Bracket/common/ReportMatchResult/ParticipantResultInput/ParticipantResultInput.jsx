import React from 'react'
import { Typography, OutlinedInput, Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '250px'
  },
  scoreInput: props => ({
    width: '80px'
  }),
  participantName: props => ({
    color: props.isWinner ? '#28a745' : props.isLoser ? '#dc3545' : 'initial'
  })
}))

export default function ParticipantResultInput (props) {
  const {
    participantName,
    value,
    handleChange,
    isWinner,
    isLoser
  } = props

  const classes = useStyles({
    isWinner,
    isLoser
  })

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      className={classes.root}
    >
      <Typography
        variant='h6'
        align='center'
        className={classes.participantName}
      >
        {participantName}
      </Typography>
      <OutlinedInput
        className={classes.scoreInput}
        value={value}
        type='text'
        onChange={handleChange}
        endAdornment={null}
        inputProps={{
          style: {
            textAlign: 'center'
          }
        }}
      />
    </Box>
  )
}
