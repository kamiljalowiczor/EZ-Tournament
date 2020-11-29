import React from 'react'
import PageLogo from './PageLogo'
import LanguageSelect from './LanguageSelect'
import SearchBar from './SearchBar'
import { useTranslation } from 'react-i18next'
import { AppBar, Toolbar, Grid, makeStyles, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: theme.spacing(6)

  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: theme.spacing(7)
  }
}))

export default function Header () {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <AppBar color='default' position='fixed' data-testid='header-id'>
      <Toolbar className={classes.toolbar} variant='dense'>
        <Grid item xs={4}>
          <PageLogo />
        </Grid>
        <Grid item xs={4}>
          <SearchBar />
        </Grid>
        <Grid
          item
          xs={4}
          className={classes.buttons}
        >
          <Button
            component={Link}
            to='/new'
            color='primary'
            variant='contained'
          >
            {t('new-tournament')}
          </Button>
          <LanguageSelect />
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
