import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import InputField from '../Utils/InputField'
import SectionCard from '../Utils/SectionCard'
import BracketFormatRadioGroup from './BracketFormat/'
import { checkValidity } from './validationUtils'

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

  const [bracketFormat, setBracketFormat] = useState('singleElimination')
  const [fieldControls, setFieldControls] = useState({
    tournamentName: {
      inputType: 'text',
      value: '',
      elementConfig: {
        labelText: 'Tournament name',
        placeholder: "Enter your tournament's name"
      },
      validation: {
        required: true,
        minLength: 3,
        maxLength: 25
      },
      valid: false,
      touched: false
    },
    description: {
      inputType: 'text',
      value: '',
      elementConfig: {
        labelText: 'Description',
        placeholder: 'Enter description of this tournament (e.g. date, game, rules and prizes)',
        multiline: true
      },
      validation: {
        required: false,
        minLength: 0,
        maxLength: 1000
      },
      valid: true,
      touched: false
    },
    host: {
      inputType: 'text',
      value: '',
      elementConfig: {
        labelText: 'Host',
        placeholder: 'Who is hosting this tournament?'
      },
      validation: {
        required: false,
        minLength: 0,
        maxLength: 50
      },
      valid: true,
      touched: false
    },
    contact: {
      inputType: 'text',
      value: '',
      elementConfig: {
        labelText: 'Host contact info',
        placeholder: 'How can participants contact you?'
      },
      validation: {
        required: false,
        minLength: 0,
        maxLength: 50
      },
      valid: true,
      touched: false
    }
  })

  function createFormElementsArray () {
    const formElementsArray = []
    for (const key in fieldControls) {
      formElementsArray.push({
        id: key,
        config: fieldControls[key]
      })
    }
    return formElementsArray
  }

  function onInputValueChange (e, fieldName) {
    const updatedFieldControls = {
      ...fieldControls,
      [fieldName]: {
        ...fieldControls[fieldName],
        value: e.target.value,
        valid: checkValidity(e.target.value, fieldControls[fieldName].validation)
      }
    }
    setFieldControls(updatedFieldControls)
  }

  function setTouched (fieldName) {
    const updatedFieldControls = {
      ...fieldControls,
      [fieldName]: {
        ...fieldControls[fieldName],
        touched: true
      }
    }
    setFieldControls(updatedFieldControls)
  }

  function isFormValid () {
    if (bracketFormat !== 'singleElimination' &&
      bracketFormat !== 'doubleElimination' &&
      bracketFormat !== 'roundRobin') {
      return false
    }

    for (const key in fieldControls) {
      if (fieldControls[key].valid) {
        return false
      }
    }
    return true
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
          changed={(e) => { onInputValueChange(e, field.id) }}
          touched={() => { setTouched(field.id) }}
          error={field.config.validation.required && field.config.touched && !field.config.valid}
        />
      </div>
    )
  }

  const formArray = createFormElementsArray()

  console.log(bracketFormat)
  console.log(fieldControls.tournamentName.value, fieldControls.host.value, fieldControls.contact.value, fieldControls.description.value)

  isFormValid()

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
      </SectionCard>
    </div>
  )
}
