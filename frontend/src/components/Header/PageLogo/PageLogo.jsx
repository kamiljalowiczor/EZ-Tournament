import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  logo: {
    minWidth: '200px'
  }
}))

export default function PageLogo () {
  const classes = useStyles()

  return (
    <Typography variant='h6' className={classes.logo}>
      EZ-Tournament
    </Typography>
  )
}
