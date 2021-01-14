import React from 'react'
import { Box } from '@material-ui/core'
import RoundMatchesConnector from '../../RoundMatchesConnector'

// matches are rendered in pairs so they can be easily connected with svg

function RoundMatches (props) {
  function getMatchPairsToNextRoundArray (matches) {
    const matchPairsArray = []

    for (let i = 0; i < matches.length; i += 2) {
      matchPairsArray.push(matches.slice(i, i + 2))
    }
    return matchPairsArray
  }

  function getMatchId (match) {
    return match.id
  }

  const isFinal = props.round.isFinal
  const pairsArray = getMatchPairsToNextRoundArray(props.round.matches)

  return (
    <Box>
      {
        pairsArray.map((matchPair, i) => {
          return (
            <RoundMatchesConnector
              key={`pairMatch${i}`}
              isFinal={isFinal}
              roundId={props.round.id}
              marginBottom={props.spaceBetweenMatches}
              matchOneId={getMatchId(matchPair[0])}
              matchTwoId={isFinal ? null : getMatchId(matchPair[1])}
              isLastInColumn={!pairsArray[i + 1]}
            />
          )
        })
      }
    </Box>
  )
}

export default React.memo(RoundMatches)
