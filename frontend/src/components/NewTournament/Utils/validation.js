export function isFormValid (bracketFormat, fieldControls) {
  if (!isBracketFormatValid(bracketFormat)) {
    return false
  }

  for (const key in fieldControls) {
    if (!fieldControls[key].valid) {
      return false
    }
  }
  return true
}

export function isFormTouched (fieldControls) {
  for (const key in fieldControls) {
    if (fieldControls[key].touched) {
      return true
    }
  }
  return false
}

export function checkValidity (value, rules) {
  let isValid = true
  if (!rules) {
    return true
  }

  if (!rules.required && value.length === 0) {
    return true
  }

  if (rules.isURL) {
    isValid = value.trim() !== '' && checkUrl(value) && isValid
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

export function checkUrl (value) {
  const re = new RegExp(/^[a-zA-Z0-9\-_]{3,20}$/)

  return re.test(value)
}

export function isBracketFormatValid (bracketFormat) {
  return bracketFormat === 'singleElimination' ||
    bracketFormat === 'doubleElimination' ||
    bracketFormat === 'roundRobin'
}

export function getMessageError (rules) {
  let errorMessage = ''

  if (rules.required) {
    errorMessage += 'This field is required. '
  }

  if (rules.isURL) {
    if (!rules.isAvailable) {
      errorMessage += 'This URL is already taken. Please try a different one.'
      return errorMessage
    }
    errorMessage += "Custom URL can't contain spaces and special characters other than - and _. "
  }

  if (rules.minLength && rules.maxLength) {
    errorMessage += `Value must be at least ${rules.minLength} and at most ${rules.maxLength} characters long.`
  } else if (rules.minLength || rules.minLength !== 0) {
    errorMessage += `Value must be at least ${rules.minLength} characters long.`
  } else if (rules.maxLength) {
    errorMessage += `Value must be at most ${rules.maxLength} characters long.`
  }

  return errorMessage
}
