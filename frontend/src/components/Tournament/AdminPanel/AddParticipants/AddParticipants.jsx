import React from 'react'
import { Typography, Tooltip, IconButton, Box, Button, makeStyles } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import InputField from '../../../Utils/InputField'
import { useTranslation } from 'react-i18next'
import useAddParticipants from './useAddParticipants'
import { getAmountOfRounds } from '../../Bracket/common/Utils/bracketMathUtils'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0.5rem 0.25rem'
  }
}))

export default function AddParticipants () {
  const { t } = useTranslation()
  const classes = useStyles()

  const {
    onParticipantsInputChange,
    onAddParticipantsClick,
    getAmountOfEnteredParticipants,
    onStartTournamentClick,
    participantsInputValue
  } = useAddParticipants()

  const amountOfParticipants = getAmountOfEnteredParticipants()
  const roundsAmount = amountOfParticipants ? getAmountOfRounds(amountOfParticipants) : 0

  const elementConfig = {
    multiline: true,
    placeholder: t('tournament:participants-input-tip')
  }

  return (
    <>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
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
        <Box style={{ textAlign: 'right' }}>
          <Typography variant='body2' display='block'>
            {`${t('tournament:participants')}: ${amountOfParticipants} / ${Math.pow(2, roundsAmount)}`}
          </Typography>
          <Typography variant='body2' display='block'>
            {`${t('tournament:rounds')}: ${roundsAmount}`}
          </Typography>
        </Box>
      </Box>
      <InputField
        type='textarea'
        value={participantsInputValue}
        changed={(e) => { onParticipantsInputChange(e) }}
        elementConfig={elementConfig}
        name='Enter participants'
      />
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={onAddParticipantsClick}
          className={classes.button}
          disabled={roundsAmount < 1}
        >
          {t('tournament:add-participants')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={onStartTournamentClick}
          disabled={roundsAmount < 1}
        >
          {t('tournament:start-tournament')}
        </Button>
      </div>
    </>
  )
}
