import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import ParticipantResultInput from './ParticipantResultInput'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'
import { reportMatchScore } from '../../../../../data/actions/tournament/tournamentActions'
import useReportMatchResult from './useReportMatchResult'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  scoreContainer: {
    minWidth: '550px',
    margin: '1rem 0'
  }
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions)

const ReportMatchResult = withStyles(styles)((props) => {
  const { t } = useTranslation()

  const {
    participant1,
    participant2,
    isOpen,
    classes
  } = props

  const {
    score1,
    score2,
    winner,
    resultText,
    isWalkover,
    handleScore1Change,
    handleScore2Change,
    handleScoreReport,
    handleClose
  } = useReportMatchResult(props)

  let scoreContainer = null
  let fillScoresText = null

  if (!isWalkover) {
    scoreContainer = (
      <Grid
        className={classes.scoreContainer}
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <ParticipantResultInput
          participantName={participant1.name}
          value={score1}
          handleChange={handleScore1Change}
          isWinner={winner === participant1.name}
          isLoser={winner === participant2.name}
        />
        <ParticipantResultInput
          participantName={participant2.name}
          value={score2}
          handleChange={handleScore2Change}
          isWinner={winner === participant2.name}
          isLoser={winner === participant1.name}
        />
      </Grid>
    )

    fillScoresText = (
      <Typography
        variant='h5'
      >
        {t('tournament:fill-scores')}
        <br />
      </Typography>
    )
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={isOpen}>
      <DialogTitle id='customized-dialog-title' onClose={handleClose}>
        {t('tournament:who-won')}
      </DialogTitle>
      <DialogContent dividers>
        {fillScoresText}
        {scoreContainer}
        <Typography
          variant='h6'
          align='center'
        >
          {resultText}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleScoreReport}
          color='primary'
          disabled={winner === null}
        >
          {t('tournament:save-changes')}
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default ReportMatchResult
