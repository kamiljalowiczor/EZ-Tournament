import React, { createRef, useEffect, useState } from 'react'
import NextRoundMatchesConnector from './NextRoundMatchesConnector'
import { Grid, Box } from '@material-ui/core'
import BracketParticipant from '../common/BracketParticipant'
import { mockData } from './mockData'

export default function SingleEliminationBracket () {
  const firstRoundMatchesMargin = 32 // in px
  const firstMarginTop = 160 / 4 - 16 // wysokosc pary / 4 - jeden zawodnik 

  let prevRoundTopMargin = 0

  return (
    <Grid container direction='row' justify='space-between'>
      {mockData.rounds.map((round, i) => {
        const currentRoundTopMargin = prevRoundTopMargin * 2 + firstMarginTop
        const currentRoundMatchesMargin = i === 0 ? firstRoundMatchesMargin : currentRoundTopMargin * 2 - firstRoundMatchesMargin / 2
        // let roundMargin = lastRoundMargin + lastRoundMargin * 2
        // if (i === 0) {
        //   roundMargin = 32
        // } else if (i === 1) {
        //   roundMargin = nextRoundMargin
        // }
        const nextRound = (
          <Grid
            xs={2}
            container
            item
            direction='column'
            key={`round${i}`}
          >
            <div style={{ marginTop: `${currentRoundTopMargin}px` }}>
              <NextRound
                round={round}
                spaceBetweenMatches={currentRoundMatchesMargin}
              />
            </div>
          </Grid>
        )

        prevRoundTopMargin = currentRoundTopMargin
        return nextRound
      })}
      <BracketParticipant />
    </Grid>
  )
}

const NextRound = React.forwardRef((props, ref) => {
  function getMatchPairsToNextRoundArray (matches) {
    // match pair - matches of which winners will play in the same match in the next round
    const matchPairsArray = []
    for (let i = 0; i < matches.length; i += 2) {
      matchPairsArray.push(matches.slice(i, i + 2))
    }

    return matchPairsArray
  }

  const pairsArray = getMatchPairsToNextRoundArray(props.round.matches)

  return (
    <Box ref={ref}>
      {
        pairsArray.map((matchPair, j) => {
          return (
            <NextRoundMatchesConnector
              key={`pairMatch${j}`}
              isFinal={matchPair.length < 2}
              marginBottom={props.spaceBetweenMatches}
              isLastInColumn={!pairsArray[j + 1]}
            />
          )
        })
      }
    </Box>
  )
})
