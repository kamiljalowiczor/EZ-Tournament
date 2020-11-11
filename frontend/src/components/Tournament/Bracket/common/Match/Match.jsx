import React, { useState } from 'react'
import BracketParticipant from '../BracketParticipant'
import { Grid, makeStyles } from '@material-ui/core'
import ReportMatchResult from '../ReportMatchResult'

const useStyles = makeStyles((theme) => ({
  matchPair: {
    display: 'inline-block',
    width: 200
  }
}))

const Match = React.forwardRef((props, ref) => {
  const classes = useStyles()
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <Grid ref={ref} className={classes.matchPair} container direction='column'>
      <Grid item onClick={openModal}>
        <BracketParticipant participant={props.participants[0]} />
      </Grid>
      <Grid item onClick={openModal}>
        <BracketParticipant participant={props.participants[1]} />
      </Grid>
      <ReportMatchResult
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
    </Grid>
  )
})

export default Match
