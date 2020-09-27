export const formFieldControls = {
  name: {
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
  customUrl: {
    inputType: 'text',
    value: '',
    elementConfig: {
      labelText: 'Custom URL',
      placeholder: 'Enter custom link for this tournament'
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
}
