import React, { useState } from 'react'
import { Typography, Tooltip, IconButton, Box } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import InputField from '../../../Utils/InputField'
import { useTranslation } from 'react-i18next'

export default function AddParticipants () {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')

  function onInputValueChange (e) {
    const value = e.target.value.trim()
    setInputValue(value)
  }

  const elementConfig = {
    multiline: true,
    placeholder: t('tournament:participants-input-tip')
  }

  return (
    <>
      <Box display='flex' alignItems='center'>
        <Typography variant='h6' style={{ marginBottom: '-1rem' }}>
          {t('tournament:enter-participants-below')}
          <Tooltip
            title={t('tournament:participants-input-tip')}
            placement='top'
          >
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
