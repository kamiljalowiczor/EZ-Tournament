import React, { useState } from 'react'
import { checkValidity } from '../../../NewTournament/validationUtils'
import { Typography, Tooltip, IconButton, Box } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import InputField from '../../../Utils/InputField'

export default function AddParticipants () {
  const [inputValue, setInputValue] = useState('')

  function onInputValueChange (e) {
    const value = e.target.value.trim()
    setInputValue(value)
  }

  const elementConfig = {
    multiline: true,
    placeholder: 'Enter one participant per line or seperate them by commas. Enter them in certain order if you want to reorganize the bracket.'
  }

  return (
    <>
      <Box display='flex' alignItems='center'>
        <Typography variant='h6' style={{ marginBottom: '-1rem' }}>
          Enter participants below
          <Tooltip title='Enter one participant per line or seperate them by commas. Enter them in certain order if you want to reorganize the bracket.' placement='top'>
            <IconButton aria-label='delete'>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Typography>
      </Box>
      <InputField
        value={inputValue}
        type='textarea'
        changed={(e) => { onInputValueChange(e) }}
        elementConfig={elementConfig}
        name='Enter participants'
      />
    </>
  )
}
