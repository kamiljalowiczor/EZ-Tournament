export function checkValidity (value, rules) {
  let isValid = true
  if (!rules) {
    return true
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
  }

  return isValid
}

export function getMessageError (rules) {
  let errorMessage = ''

  if (!rules.required) {
    return ''
  } else {
    errorMessage += 'This field is required. '
  }

  if (rules.minLength && rules.maxLength) {
    errorMessage += `Value must be at least ${rules.minLength} and at most ${rules.maxLength} characters long.`
  } else if (rules.minLength || rules.minLength === 0) {
    errorMessage += `Value must be at least ${rules.minLength} characters long.`
  } else if (rules.maxLength) {
    errorMessage += `Value must be shorter than ${rules.maxLength} characters.`
  }

  return errorMessage
}
