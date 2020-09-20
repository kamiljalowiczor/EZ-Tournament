import React from 'react'
import { Grid, Typography, makeStyles, Tooltip, IconButton, createMuiTheme, MuiThemeProvider, Box } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import LinkToCopy from './LinkToCopy'

const useStyles = makeStyles((theme) => ({
  linkItem: {
    marginBottom: '2rem'
  }
}))

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '0.75rem'
      }
    }
  }
});

export default function Links (props) {
  const classes = useStyles()

  const {
    adminLink,
    participantLink
  } = props

  return (
    <MuiThemeProvider theme={theme}>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Grid className={classes.linkItem} item>
          <Typography variant='h6'>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              Link for participants
              <Tooltip title='This is the link you can safely distribute to participants.' placement='top'>
                <IconButton aria-label='delete'>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Typography>
          <LinkToCopy link={participantLink} />
        </Grid>
        <Grid className={classes.linkItem} item>
          <Typography variant='h6'>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              Tournament admin link
              <Tooltip
                title='You can access admin settings for this tournament under this link.
                DO NOT SHARE THIS LINK WITH PARTICIPANTS UNLESS YOU WANT THEM TO HAVE ADMIN RIGHTS!'
                placement='top'
              >
                <IconButton aria-label='delete'>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Typography>
          <LinkToCopy link={adminLink} />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  )
}
