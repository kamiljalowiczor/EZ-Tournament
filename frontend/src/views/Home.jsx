import React, { useEffect } from 'react'
import { makeStyles, Box, Grid, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Grid container className={classes.root}>
        <Grid container item xs={12} direction='column' justify='flex-end' alignItems='center' className={`${classes.showcaseItem} ${classes.showcaseTop}`}>
          <Typography variant='h2'>
            EZ-Tournament
          </Typography>
          <Typography variant='h6'>
            {t('home:site-description')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container xs={12} item direction='row' justify='center' alignItems='center' className={classes.showcaseItem}>
            <Grid item xs={6}>
              <Box display='flex' flexDirection='column' justify='center' alignItems='center'>
                <Typography variant='subtitle1'>
                  {t('home:clicks-away')}
                </Typography>
                <Typography variant='h5'>
                  {t('home:no-registration-needed')}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Button component={Link} to='/new' size='large' color='default' variant='outlined'>
                {t('home:start-tournament')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
