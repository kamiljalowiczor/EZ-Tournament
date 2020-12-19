import React from 'react'
import PageLogo from './PageLogo'
import LanguageSelect from './LanguageSelect'
import { useTranslation } from 'react-i18next'
import { AppBar, Toolbar, Grid, makeStyles, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: theme.spacing(6),
    maxWidth: '1200px',
    margin: 'auto'
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: theme.spacing(7)
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default function Header () {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <AppBar color='default' position='fixed' data-testid='header-id'>
      <Toolbar variant='dense'>
        <Grid container className={classes.toolbar} justify='center' alignItems='center'>
          <Grid item xs={6}>
            <PageLogo />
          </Grid>
          <Grid
            item
            xs={6}
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
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
