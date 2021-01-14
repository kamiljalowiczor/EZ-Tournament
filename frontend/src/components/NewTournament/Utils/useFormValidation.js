import { useTranslation } from 'react-i18next'

export default function useFormValidation () {
  const { t } = useTranslation()

  function isBracketFormatValid (bracketFormat) {
    return bracketFormat === 'singleElimination' ||
      bracketFormat === 'doubleElimination' ||
      bracketFormat === 'roundRobin'
  }

  function isFormValid (bracketFormat, fieldControls) {
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

  function isFormTouched (fieldControls) {
    for (const key in fieldControls) {
      if (fieldControls[key].touched) {
        return true
      }
    }
    return false
  }

  function checkValidity (value, rules) {
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

  function checkUrl (value) {
    const re = new RegExp(/^[a-zA-Z0-9\-_]{5,20}$/)

    return re.test(value)
  }

  function getErrorMessage (rules) {
    let errorMessage = ''

    if (rules.required) {
      errorMessage += t('form:field-required')
    }

    if (rules.isURL) {
      if (!rules.isAvailable) {
        errorMessage += t('form:url-taken')
        return errorMessage
      }
      errorMessage += t('form:url-invalid')
    }

    if (rules.minLength && rules.maxLength) {
      errorMessage +=
        t('form:invalid-length',
          {
            minLength: rules.minLength,
            maxLength: rules.maxLength
          })
    } else if (rules.minLength || rules.minLength !== 0) {
      errorMessage += t('form:invalid-length-min', { minLength: rules.minLength })
    } else if (rules.maxLength) {
      errorMessage += t('form:invalid-length-max', { maxLength: rules.maxLength })
    }

    return errorMessage
  }

  return {
    isBracketFormatValid,
    isFormValid,
    isFormTouched,
    checkValidity,
    checkUrl,
    getErrorMessage
  }
}
