import React, { createRef, useEffect, useState } from 'react'
import Match from '../../common/Match'
import SingleEliminationLine from '../SingleEliminationLine'
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative'
  },
  marginBottom: props => ({
    marginBottom: props.marginBottom ? props.marginBottom : 0
  })
}))

function RoundMatchesConnector (props) {
  const [lineHeight, setLineHeight] = useState(0)
  const [lineTopOffset, setLineTopOffset] = useState(0)

  const classes = useStyles(props)

  const refMatch1 = createRef()
  const refMatch2 = createRef()

  useEffect(() => {
    const desiredOffset = refMatch1.current.getBoundingClientRect().height / 2

    if (!props.isFinal) {
      setLineHeight(refMatch2.current.getBoundingClientRect().y - refMatch1.current.getBoundingClientRect().y)
    }
    setLineTopOffset(desiredOffset)
  })

  const containerClassName = `${classes.root} ${props.isLastInColumn ? '' : classes.marginBottom}`

  return (
    <Grid
      className={containerClassName}
      container
      direction='column'
    >
      <Grid item>
        <Match
          ref={refMatch1}
          matchId={props.matchOneId}
          roundId={props.roundId}
          isFinal={props.isFinal}
        />
        <div className={classes.marginBottom} />
        {props.isFinal
          ? null
          : (
            <Match
              ref={refMatch2}
              matchId={props.matchTwoId}
              roundId={props.roundId}
            />
          )}
      </Grid>
      <Grid item xs={12}>
        <SingleEliminationLine
          topOffset={lineTopOffset}
          height={props.isFinal ? '0' : lineHeight}
          width='30'
        />
      </Grid>
    </Grid>
  )
}

export default React.memo(RoundMatchesConnector)
