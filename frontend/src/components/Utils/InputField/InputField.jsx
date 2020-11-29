import React from 'react'
import { FormControl, FormLabel, TextField, RadioGroup, makeStyles, createMuiTheme, MuiThemeProvider, FormHelperText } from '@material-ui/core'
import useFormValidation from '../../NewTournament/Utils/useFormValidation'

const useStyles = makeStyles((theme) => ({
  formLabel: {
    marginBottom: '1rem'
  }
}))

const formLabelsTheme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      asterisk: {
        color: '#db3131',
        '&$error': {
          color: '#db3131'
        }
      }
    }
  }
})

function getInputComponent (type, props) {
  const textField = (
    <TextField
      fullWidth
      id={props.name}
      placeholder={props.elementConfig.placeholder}
      multiline={props.elementConfig.multiline}
      rows={props.elementConfig.multiline ? 15 : 0}
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

  const fieldComponent = getInputComponent(props.type, { ...props })

  let errorLabel = null

  if (props.error) {
    errorLabel = (
      <FormHelperText>
        {getErrorMessage(props.validation)}
      </FormHelperText>
    )
  }

  return (
    <MuiThemeProvider theme={formLabelsTheme}>
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
    </MuiThemeProvider>
  )
}
