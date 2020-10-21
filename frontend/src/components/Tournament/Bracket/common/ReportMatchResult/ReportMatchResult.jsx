import React, { useState } from 'react'
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
  const {
    participant1 = 'pudzix',
    participant2 = 'pudzicxocjks',
    isOpen,
    closeModal,
    classes
  } = props

  const { t } = useTranslation()
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)
  const [resultText, setResultText] = useState('')
  const [winner, setWinner] = useState(null)

  const adjustScoreInput = (value) => {
    value = value.replace(/[^\d]/, '')

    while (value.charAt(0) === '0' && value !== '0') {
      value = value.substring(1)
    }

    return value
  }

  const handleScore1Change = (e) => {
    const value = adjustScoreInput(e.target.value)

    if (value.length < 5) {
      setScore1(+value)
      updateResultUI(+value, +score2)
    }
  }

  const handleScore2Change = (e) => {
    const value = adjustScoreInput(e.target.value)

    if (value.length < 5) {
      setScore2(+value)
      updateResultUI(+score1, +value)
    }
  }

  const updateResultUI = (score1, score2) => {
    if (score1 > score2) {
      setResultText(`${t('tournament:winner')}: ${participant1}`)
      setWinner(participant1)
    } else if (score1 < score2) {
      setResultText(`${t('tournament:winner')}: ${participant2}`)
      setWinner(participant2)
    } else {
      setResultText(t('tournament:draws'))
      setWinner(null)
    }
  }

  const handleClose = () => {
    // handelklouz musi byc odpalane tylko wtedy gdy user wyjdzie na blurze!!
    closeModal()
    setScore1(0)
    setScore2(0)
    setResultText('')
    setWinner(null)
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={isOpen}>
      <DialogTitle id='customized-dialog-title' onClose={handleClose}>
        {t('tournament:who-won')}
      </DialogTitle>
      <DialogContent dividers>
        <Typography
          variant='h5'
        >
          {t('tournament:fill-scores')}
          <br />
          w sumie chyba najlatwiej bedzie jak admin bedzie mial jakis przycisk 'end round' ktory po prostu skonczy runde i juz wtedy nie bedzie mozna edytowac scoreow. jakies currentRound nie wiem cos takiego
        </Typography>
        <Grid
          className={classes.scoreContainer}
          container
          direction='row'
          justify='space-between'
          alignItems='center'
        >
          <ParticipantResultInput
            participantName={participant1}
            value={score1}
            handleChange={handleScore1Change}
            isWinner={winner === participant1}
            isLoser={winner === participant2}
          />
          <ParticipantResultInput
            participantName={participant2}
            value={score2}
            handleChange={handleScore2Change}
            isWinner={winner === participant2}
            isLoser={winner === participant1}
          />
        </Grid>
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
          onClick={handleClose}
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
