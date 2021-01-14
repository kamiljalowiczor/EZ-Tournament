import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, Button, Box, Typography } from '@material-ui/core'
import InputField from '../Utils/InputField'
import useFormValidation from './Utils/useFormValidation'
import {
  createFormElementsArray,
  getInputFieldsData,
  getUpdatedInputValue,
  getUpdatedTouched,
  getUpdatedCustomUrl,
  getUpdatedUrlAvailabilityFlag
} from './Utils/form'
import useFormFieldControls from './useFormFieldControls'
import {
  newTournamentSubmit,
  newTournamentUrlChange
} from '../../data/actions/tournament/tournamentActions'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'
import Spinner from '../Utils/Spinner'
import { checkUrl } from './Utils/validation'

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

export default function NewTournamentForm (props) {
  const { t } = useTranslation()
  const classes = useStyles()
  const dispatch = useDispatch()

  const { getFormFieldControls } = useFormFieldControls()
  const {
    isFormValid
  } = useFormValidation()

  const bracketFormat = 'singleElimination'
  const [fieldControls, setFieldControls] = useState(getFormFieldControls())
  const [shouldDisplayDataIncorrectLabel, setShouldDisplayDataIncorrectLabel] = useState(true)

  const formArray = createFormElementsArray(fieldControls)

  const isUrlAvailable = useSelector(state => state.tournament.isUrlAvailable)
  const isUrlCheckInProgress = useSelector(state => state.tournament.isUrlCheckInProgress)
  const isSubmittingNewTournament = useSelector(state => state.tournament.isSubmittingNewTournament)

  useEffect(() => {
    onUrlAvailabilityChange()
  }, [isUrlAvailable, isUrlCheckInProgress])

  const debouncedUrlCheck = React.useCallback(_.debounce((value) => {
    value = value.length > 4 ? value : ''
    dispatch(newTournamentUrlChange(value))
  }, 500), [])

  i18n.on('languageChanged', () => {
    const newFieldControls = getFormFieldControls()

    for (const key in newFieldControls) {
      newFieldControls[key].value = fieldControls[key].value
      newFieldControls[key].touched = fieldControls[key].touched
      newFieldControls[key].valid = fieldControls[key].valid
    }

    if (!isFormValid(fieldControls)) {
      updateErrorMessages()
    }

    setFieldControls(newFieldControls)
  })

  function onInputValueChange (value, fieldName) {
    const updatedFieldControls = getUpdatedInputValue(value, fieldName, fieldControls)
    setFieldControls(updatedFieldControls)
    setShouldDisplayDataIncorrectLabel(!isFormValid(bracketFormat, updatedFieldControls))
  }

  function onUrlAvailabilityChange () {
    const updatedFieldControls = getUpdatedUrlAvailabilityFlag(fieldControls, isUrlAvailable)
    setFieldControls(updatedFieldControls)
    setShouldDisplayDataIncorrectLabel(!isFormValid(bracketFormat, updatedFieldControls))
  }

  function onCustomUrlValueChange (value, fieldName) {
    value = value.replace(/\s+$/, '')
    if (checkUrl(value)) {
      debouncedUrlCheck(value)
    }

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
      setShouldDisplayDataIncorrectLabel(false)
    } else {
      updateErrorMessages()
    }
  }

  function mapField (field) {
    return (
      <div
        key={field.id}
        className={classes.formControl}
      >
        <InputField
          value={field.config.value}
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

  let incorrectDataLabel = null

  if (shouldDisplayDataIncorrectLabel) {
    incorrectDataLabel = (
      <Typography
        color='error'
        component='h6'
      >
        {t('form:incorrect-data')}
      </Typography>
    )
  }

  return (
    <div className={classes.root}>
      <Box>
        {/* <Typography variant='h4' align='center'>{t('form:form-title')}</Typography> */}
        {formArray.map(field => (
          mapField(field)
        ))}
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
          <Button
            onClick={handleFormSubmit}
            className={classes.formControl}
            size='large'
            color='primary'
            variant='contained'
            disabled={
              shouldDisplayDataIncorrectLabel || isSubmittingNewTournament
            }
            endIcon={isSubmittingNewTournament ? <Spinner size={26} /> : null}
          >
            {t('submit')}
          </Button>
          {incorrectDataLabel}
        </Box>
      </Box>
    </div>
  )
}
