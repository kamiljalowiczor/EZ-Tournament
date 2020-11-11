import React, { useState, useEffect } from 'react'
import NextRoundMatchesConnector from './NextRoundMatchesConnector'
import { Grid, Box, Paper, Typography, makeStyles } from '@material-ui/core'
import BracketParticipant from '../common/BracketParticipant'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  roundTab: {
    textAlign: 'center',
    padding: '0.5rem 0rem',
    width: '199px'
  }
}))

export default function SingleEliminationBracket () {
  const classes = useStyles()
  const { t } = useTranslation()
  const { roundsAmount, rounds } = useSelector((state) => state.tournament.bracket)

  function getRoundLabel (roundNumber, roundsAmount) {
    if (roundNumber === roundsAmount + 1) {
      return t('tournament:winner')
    } else if (roundNumber === roundsAmount) {
      return t('tournament:final')
    } else if (roundNumber === roundsAmount - 1) {
      return t('tournament:semifinals')
    } else if (roundNumber === roundsAmount - 2) {
      return t('tournament:quarterfinals')
    } else {
      return t('tournament:round') + ` ${roundNumber}`
    }
  }

  const firstRoundMatchesMargin = 32 // in px
  const firstMarginTop = 160 / 4 - 16 // wysokosc pary / 4 - jeden zawodnik

  let prevRoundTopMargin = 0

  const width = 266 * roundsAmount // 266 to tak na oko tyle ile potrzeba xD

  const height = roundsAmount === 1 ? 192 + 50 : Math.pow(2, roundsAmount) / 4 * 192 + 50 // 160 to wysokosc dwoch meczow obok siebie + 32 margin bottom, + 50 zeby round header sie zmiescil

  return (
    <ScrollContainer vertical={false} style={{ cursor: 'grab' }}>
      <Grid
        container
        direction='row'
        justify='space-between'
        wrap='nowrap'
        style={{ margin: 'auto', width: width, height: height }}
      >
        {rounds.map((round, i) => {
          const currentRoundTopMargin = prevRoundTopMargin * 2 + firstMarginTop
          const currentRoundMatchesMargin = i === 0
            ? firstRoundMatchesMargin
            : currentRoundTopMargin * 2 - firstRoundMatchesMargin / 2

          const nextRound = (
            <Grid key={`round${i + 1}`} style={{ minWidth: '237px' }}>
              <div>
                <Paper variant='outlined' square elevation={3} className={classes.roundTab}>
                  <Typography>
                    {getRoundLabel(i + 1, rounds.length)}
                  </Typography>
                </Paper>
              </div>
              <Grid
                item
                container
              >
                <div style={{ marginTop: `${currentRoundTopMargin}px` }}>
                  <NextRound
                    isFinal={i + 1 === rounds.length}
                    roundNumber={i + 1}
                    round={round}
                    spaceBetweenMatches={currentRoundMatchesMargin}
                  />
                </div>
              </Grid>
            </Grid>
          )

          prevRoundTopMargin = currentRoundTopMargin

          return nextRound
        })}
        <Grid style={{ minWidth: '237px' }}>
          <div style={{ display: /* isTournamentFinished */ true ? 'block' : 'none' }}>
            <Paper
              variant='outlined'
              square
              elevation={3}
              className={classes.roundTab}
            >
              <Typography>
                {getRoundLabel(rounds.length + 1, rounds.length)}
              </Typography>
            </Paper>
            <Grid
              item
              container
            >
              <div style={{ marginTop: `${prevRoundTopMargin + 16}px` }}>
                <BracketParticipant />
              </div>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </ScrollContainer>
  )
}

const NextRound = (props) => {
  function getMatchPairsToNextRoundArray (matches) {
    // match pair - matches of which winners will play in the same match in the next round
    const matchPairsArray = []
    for (let i = 0; i < matches.length; i += 2) {
      matchPairsArray.push(matches.slice(i, i + 2))
    }
    return matchPairsArray
  }
  const [, forceUpdate] = useState(x => x + 1, 0)
  useEffect(() => {
    forceUpdate()
  }, [props])

  function getParticipantNamesForMatch (matchPair) {
    let matchParticipants = ['', '']
    console.log(matchPair)
    if (matchPair && matchPair.players) {
      matchParticipants = [
        {
          name: matchPair.players[0] && matchPair.players[0].name ? matchPair.players[0].name : ' ',
          id: matchPair.players[0] && matchPair.players[0].id ? matchPair.players[0].id : ' '
        },
        {
          name: matchPair.players[1] && matchPair.players[1].name ? matchPair.players[1].name : ' ',
          id: matchPair.players[1] && matchPair.players[1].id ? matchPair.players[1].id : ' '
        }
      ]
    }

    return matchParticipants
  }

  const isFinal = props.round.isFinal
  const pairsArray = getMatchPairsToNextRoundArray(props.round.matches)

  return (
    <Box>
      {
        pairsArray.map((matchPair, i) => {
          return (
            <NextRoundMatchesConnector
              key={`pairMatch${i}`}
              isFinal={isFinal}
              marginBottom={props.spaceBetweenMatches}
              matchOneParticipants={getParticipantNamesForMatch(matchPair[0])}
              matchTwoParticipants={getParticipantNamesForMatch(matchPair[1])}
              isLastInColumn={!pairsArray[i + 1]}
            />
          )
        })
      }
    </Box>
  )
}
