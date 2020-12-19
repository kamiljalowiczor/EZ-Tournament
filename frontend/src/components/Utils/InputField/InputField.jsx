import React from 'react'
import { FormControl, FormLabel, TextField, RadioGroup, makeStyles, FormHelperText } from '@material-ui/core'
import useFormValidation from '../../NewTournament/Utils/useFormValidation'

const useStyles = makeStyles((theme) => ({
  formLabel: {
    marginBottom: '1rem'
  }
}))

function getInputComponent (type, props, error) {
  const rows = props.elementConfig.rows ? props.elementConfig.rows : 15

  const textField = (
    <TextField
      fullWidth
      error={error}
      id={props.name}
      placeholder={props.elementConfig.placeholder}
      multiline={props.elementConfig.multiline}
      rows={props.elementConfig.multiline && rows}
      onChange={(e) => { props.changed(e) }}
      onBlur={(e) => { if (props.touched) props.touched(e) }}
      variant='outlined'
      value={props.value}
    />
  )

  switch (type) {
    case 'text':
      return textField
    case 'radio':
      return <RadioGroup />
    case 'bracket':
    default:
      return textField
  }
}

export default function InputField (props) {
  const { getErrorMessage } = useFormValidation()
  const classes = useStyles()

  const fieldComponent = getInputComponent(props.type, { ...props }, !!props.error)

  let errorLabel = null

  if (props.error) {
    errorLabel = (
      <FormHelperText>
        {getErrorMessage(props.validation)}
      </FormHelperText>
    )
  }

  return (
    <FormControl
      className={classes.formControl}
      fullWidth
      required={props && props.validation && props.validation.required}
      error={props.error}
    >
      <FormLabel
        htmlFor={props.name}
        className={classes.formLabel}
      >
        {props.elementConfig.labelText}
      </FormLabel>
      {fieldComponent}
      {errorLabel}
    </FormControl>
  )
}
