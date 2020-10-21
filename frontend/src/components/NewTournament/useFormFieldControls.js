import { useTranslation } from 'react-i18next'

export default function useFormFieldControls () {
  const { t } = useTranslation()

  function getFormFieldControls () {
    return {
      name: {
        inputType: 'text',
        value: '',
        elementConfig: {
          labelText: t('form:label-name'),
          placeholder: t('form:placeholder-name')
        },
        validation: {
          required: true,
          minLength: 3,
          maxLength: 25
        },
        valid: false,
        touched: false
      },
      customUrl: {
        inputType: 'text',
        value: '',
        elementConfig: {
          labelText: t('form:label-url'),
          placeholder: t('form:placeholder-url')
        },
        validation: {
          required: false,
          minLength: 5,
          maxLength: 20,
          isURL: true,
          isAvailable: true
        },
        isSyntaxValid: true,
        valid: true,
        touched: false
      },
      description: {
        inputType: 'text',
        value: '',
        elementConfig: {
          labelText: t('form:label-description'),
          placeholder: t('form:placeholder-description'),
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
          labelText: t('form:label-host'),
          placeholder: t('form:placeholder-host')
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
          labelText: t('form:label-contact'),
          placeholder: t('form:placeholder-contact')
        },
        validation: {
          required: false,
          minLength: 0,
          maxLength: 50
        },
        valid: true,
        touched: false
      }
    }
  }

  return { getFormFieldControls }
}
