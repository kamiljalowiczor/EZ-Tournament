import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Box } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default function Spinner ({ size = 70 }) {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <CircularProgress size={size} />
    </Box>
  )
}
