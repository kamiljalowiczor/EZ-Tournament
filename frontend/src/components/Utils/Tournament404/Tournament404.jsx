import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, Button } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh'
import history from '../../../history'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  errorMessage: {
    marginBottom: '1rem',
    fontSize: '3rem',
    color: '#333',
    textAlign: 'center',
    maxWidth: '60%'
  }
})

const handleRedirectToMainPage = () => {
  history.push('/')
}

export default function Tournament404 () {
  const classes = useStyles()

  const { t } = useTranslation()

  return (
    <Box className={classes.root}>
      <Typography component='h2' className={classes.errorMessage}>
        {':^('}
      </Typography>
      <Typography component='h5' className={classes.errorMessage}>
        {t('something-went-wrong')}
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={handleRedirectToMainPage}
      >
        {t('back-to-main-page')}
      </Button>
    </Box>
  )
}
