import React from 'react'
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
import useReportMatchResult from './useReportMatchResult'
import Spinner from '../../../../Utils/Spinner'

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
    marginBottom: '1rem'
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
    isReadyToReport,
    isReportingMatch,
    reportMatchError,
    dummyIsScoreReportedFlag,
    handleOnExited,
    handleScore1Change,
    handleScore2Change,
    handleScoreReport,
    handleClose
  } = useReportMatchResult(props)

  let scoreContainer = null
  let modalTitle = null
  let onClickHandleFunction = null
  let buttonText = null
  let alternativeText = null
  let isButtonDisabled = false

  if (reportMatchError) {
    onClickHandleFunction = handleClose
    buttonText = 'OK'
    modalTitle = t('tournament:report-score-error-title')
    alternativeText = t('tournament:report-score-error-text')
  } else if (isReadyToReport && !dummyIsScoreReportedFlag) {
    modalTitle = t('tournament:fill-scores')
    onClickHandleFunction = handleScoreReport
    buttonText = t('tournament:save-changes')
    alternativeText = null
    isButtonDisabled = isReportingMatch || score1 === score2

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
  } else {
    onClickHandleFunction = handleClose
    buttonText = 'OK'

    const onlyParticipant = participant1.name || participant2.name

    modalTitle = !isReadyToReport
      ? t('tournament:awaiting-opponent-title')
      : t('tournament:score-reported-title')

    alternativeText = !isReadyToReport
      ? t('tournament:awaiting-opponent-text', { onlyParticipant })
      : t('tournament:score-reported-text')
  }

  return (
    <Dialog onExited={handleOnExited} onClose={handleClose} aria-labelledby='customized-dialog-title' open={isOpen}>
      <DialogTitle id='customized-dialog-title' onClose={handleClose}>
        {modalTitle}
      </DialogTitle>
      <DialogContent dividers>
        {scoreContainer}
        <Typography
          variant='h6'
          align='center'
        >
          {alternativeText || resultText}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={onClickHandleFunction}
          color='primary'
          disabled={isButtonDisabled}
          endIcon={isReportingMatch ? <Spinner size={26} /> : null}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default ReportMatchResult
