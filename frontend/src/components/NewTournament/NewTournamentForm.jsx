import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, Button, Box } from '@material-ui/core'
import InputField from '../Utils/InputField'
import SectionCard from '../Utils/SectionCard'
import BracketFormatRadioGroup from './BracketFormat/'
import {
  isFormValid
} from './Utils/validation'
import {
  createFormElementsArray,
  getInputFieldsData,
  getUpdatedInputValue,
  getUpdatedTouched,
  getUpdatedCustomUrl,
  getUpdatedUrlAvailabilityFlag
} from './Utils/form'
import { formFieldControls } from './formFieldControls'
import {
  newTournamentSubmit,
  newTournamentUrlChange
} from '../../data/actions/tournament/tournamentActions'
import _ from 'lodash'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
    margin: 'auto',
    marginTop: '2rem',
    width: '90%'
  },
  formControl: {
    margin: '1rem 0'
  }
}))

export default function NewTournamentForm () {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [bracketFormat, setBracketFormat] = useState('singleElimination')
  const [fieldControls, setFieldControls] = useState(formFieldControls)

  const formArray = createFormElementsArray(fieldControls)

  const isUrlAvailable = useSelector(state => state.tournament.isUrlAvailable)
  const isUrlCheckInProgress = useSelector(state => state.tournament.isUrlCheckInProgress)

  useEffect(() => {
    onUrlAvailabilityChange()
  }, [isUrlAvailable, isUrlCheckInProgress])

  const debouncedUrlCheck = React.useCallback(_.debounce((value) => {
    dispatch(newTournamentUrlChange(value))
  }, 500), [])

  function onInputValueChange (value, fieldName) {
    value = value.trim()

    const updatedFieldControls = getUpdatedInputValue(value, fieldName, fieldControls)
    setFieldControls(updatedFieldControls)
  }

  function onUrlAvailabilityChange () {
    const updatedFieldControls = getUpdatedUrlAvailabilityFlag(fieldControls, isUrlAvailable)
    setFieldControls(updatedFieldControls)
  }

  function onCustomUrlValueChange (value, fieldName) {
    value = value.replace(/\s+$/, '')
    debouncedUrlCheck(value)

    const updatedFieldControls = getUpdatedCustomUrl(value, fieldName, fieldControls)
    setFieldControls(updatedFieldControls)
  }

  function setTouched (fieldName) {
    const updatedFieldControls = getUpdatedTouched(fieldName, fieldControls)
    setFieldControls(updatedFieldControls)
  }

  function updateErrorMessages () {
    for (const key in fieldControls) {
      if (!fieldControls[key].valid) {
        return setTouched(key)
      }
    }
  }

  function handleFormSubmit () {
    if (isFormValid(bracketFormat, fieldControls) && !isUrlCheckInProgress) {
      const tournamentData = getInputFieldsData(bracketFormat, fieldControls)
      dispatch(newTournamentSubmit(tournamentData))
    } else {
      updateErrorMessages()
    }
  }

  function mapField (field) {
    return (
      <div className={classes.formControl}>
        <InputField
          value={field.config.value}
          key={field.id}
          type={field.config.inputType}
          elementConfig={field.config.elementConfig}
          id={field.id}
          autoFocus={field.config.autoFocus}
          validation={field.config.validation}
          changed={(e) => {
            field.id === 'customUrl'
              ? onCustomUrlValueChange(e.target.value, field.id)
              : onInputValueChange(e.target.value, field.id)
          }}
          touched={() => { setTouched(field.id) }}
          error={!field.config.valid && field.config.touched}
        />
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <SectionCard
        title='Bracket format'
        subheader='dajemy czadu'
      >
        <BracketFormatRadioGroup
          value={bracketFormat}
          changed={setBracketFormat}
        />
      </SectionCard>
      <SectionCard
        title='Tournament information'
        subheader='co i jak'
      >
        {formArray.map(field => (
          mapField(field)
        ))}
        <Box display='flex' justifyContent='center'>
          <Button onClick={handleFormSubmit} className={classes.formControl} size='large' color='primary' variant='contained'>
            Submit
          </Button>
        </Box>
      </SectionCard>
    </div>
  )
}
