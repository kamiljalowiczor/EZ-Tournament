import React from 'react'
import { Grid, Typography, makeStyles, Tooltip, IconButton, createMuiTheme, MuiThemeProvider, Box } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import LinkToCopy from './LinkToCopy'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  linkItem: {
    marginBottom: '2rem',
    width: '80%'
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
})

export default function Links (props) {
  const classes = useStyles()
  const { t } = useTranslation()

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
              {t('tournament:link-for-participants')}
              <Tooltip
                title={t('tournament:link-for-participants-tip')}
                placement='top'
              >
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
              {t('tournament:link-for-admin')}
              <Tooltip
                title={t('tournament:link-for-admin-tip')}
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
