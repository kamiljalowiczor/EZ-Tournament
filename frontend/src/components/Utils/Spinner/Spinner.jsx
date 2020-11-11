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

export default function Spinner () {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <CircularProgress size={70} />
    </Box>
  )
}
