import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#54B63F',
      contrastText: '#f5f5f5'
    },
    secondary: {
      main: '#ff6868'
    }
  },
  overrides: {
    MuiFormLabel: {
      asterisk: {
        color: '#db3131',
        '&$error': {
          color: '#db3131'
        }
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '0.75rem'
      }
    },
    MuiOutlinedInput: {
      root: {
        position: 'relative',
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
          borderColor: '#54B63F',
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            borderColor: '#54B63F'
          }
        },
        '&$focused $notchedOutline': {
          borderColor: '#54B63F',
          borderWidth: 2
        },
        '&$error $notchedOutline': {
          borderColor: '#db3131'
        }
      }
    }
  }
})

export default theme
