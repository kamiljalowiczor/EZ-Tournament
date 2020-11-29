import { checkValidity } from './validation'

export function createFormElementsArray (fieldControls) {
  const formElementsArray = []
  for (const key in fieldControls) {
    formElementsArray.push({
      id: key,
      config: fieldControls[key]
    })
  }
  return formElementsArray
}

export function getUpdatedInputValue (value, fieldName, fieldControls) {
  const updatedFieldControls = {
    ...fieldControls,
    [fieldName]: {
      ...fieldControls[fieldName],
      value: value,
      valid: checkValidity(value, fieldControls[fieldName].validation)
    }
  }

  return updatedFieldControls
}

export function getUpdatedTouched (fieldName, fieldControls) {
  const updatedFieldControls = {
    ...fieldControls,
    [fieldName]: {
      ...fieldControls[fieldName],
      touched: true
    }
  }

  return updatedFieldControls
}

export function getUpdatedCustomUrl (value, fieldName, fieldControls) {
  const isValidUrl = checkValidity(value, fieldControls[fieldName].validation)

  const updatedFieldControls = {
    ...fieldControls,
    [fieldName]: {
      ...fieldControls[fieldName],
      value: value,
      isSyntaxValid: isValidUrl,
      valid: isValidUrl && fieldControls[fieldName].validation.isAvailable
    }
  }

  return updatedFieldControls
}

export function getUpdatedUrlAvailabilityFlag (fieldControls, isUrlAvailable) {
  const updatedFieldControls = {
    ...fieldControls,
    customUrl: {
      ...fieldControls.customUrl,
      validation: {
        ...fieldControls.customUrl.validation,
        isAvailable: isUrlAvailable
      },
      valid: fieldControls.customUrl.isSyntaxValid && isUrlAvailable
    }
  }

  return updatedFieldControls
}

export function getInputFieldsData (bracketFormat, fieldControls) {
  const name = fieldControls.name.value.trim()
  const description = fieldControls.description.value.trim()
  const host = fieldControls.host.value.trim()
  const contact = fieldControls.contact.value.trim()
  const customUrl = fieldControls.customUrl.value.trim()

  return {
    name,
    customUrl,
    description,
    host,
    contact
  }
}
