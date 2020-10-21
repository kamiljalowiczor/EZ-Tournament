import React from 'react'
import PageLogo from './PageLogo'
import LanguageSelect from './LanguageSelect'
import SearchBar from './SearchBar'
import { useTranslation } from 'react-i18next'
import { AppBar, Toolbar, Box, makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: theme.spacing(6),
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: '200px',
    minHeight: theme.spacing(7)
  }
}))

export default function Header () {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <AppBar color='default' position='fixed' data-testid='header-id'>
      <Toolbar className={classes.toolbar}>
        <PageLogo />
        <SearchBar />
        <Box
          className={classes.buttons}
        >
          <LanguageSelect />
          <Button>{t('night-mode')}</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
