import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import Header from '../components/Header'

const useStyles = makeStyles(theme => ({
  content: {
    boxSizing: 'border-box',
    minHeight: '100vh',
    background: theme.palette.background.default
  }
}))

export default function Layout ({ children }) {
  const classes = useStyles()

  return (
    <Grid className={classes.root}>
      <Header />
      <Grid container justify='center' className={classes.content}>
        {children}
      </Grid>
    </Grid>
  )
}
