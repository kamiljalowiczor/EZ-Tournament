import React, { useEffect } from 'react'
import { useDispatch } from 'redux-react-hook'
import actionTypes from '../common/constants/actionTypes'
import { makeStyles, Box, Grid, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '1000px'
  },
  root: {
    height: '100vh',
    textAlign: 'center'
  },
  showcaseItem: {
    padding: '2.5rem'
  },
  showcaseTop: {
    marginBottom: '1rem'
  }
}))

export default function Home () {
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: actionTypes.HOME_LOADED_ACTION })
  }, [])

  return (
    <div className={classes.container}>
      <Grid container className={classes.root}>
        <Grid container item xs={12} direction='column' justify='flex-end' alignItems='center' className={`${classes.showcaseItem} ${classes.showcaseTop}`}>
          <Typography variant='h2'>
            EZ-Tournament
          </Typography>
          <Typography variant='h6'>
            The simplest tournament management website
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container xs={12} item direction='row' justify='center' alignItems='center' className={classes.showcaseItem}>
            <Grid item xs={6}>
              <Box display='flex' flexDirection='column' justify='center' alignItems='center'>
                <Typography variant='subtitle1'>
                  You are just a few clicks away from starting your tournament.
                </Typography>
                <Typography variant='h5'>
                  No registration needed!
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Button component={Link} to='/new' size='large' color='default' variant='outlined'>
                Start your tournament now
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
