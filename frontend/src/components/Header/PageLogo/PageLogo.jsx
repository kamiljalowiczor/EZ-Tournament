import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  logo: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)'
  }
}))

export default function PageLogo () {
  const classes = useStyles()

  return (
    <Typography
      component={Link}
      to='/'
      variant='h6'
      className={classes.logo}
    >
      EZ-Tournament
    </Typography>
  )
}
