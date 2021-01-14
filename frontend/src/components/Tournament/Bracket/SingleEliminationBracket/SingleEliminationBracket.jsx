import React from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import ScrollContainer from 'react-indiana-drag-scroll'
import RoundColumn from './RoundColumn'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { tournamentStatusTypes } from '../../../../common/constants/tournamentStatus'
import Spinner from '../../../Utils/Spinner'
import TournamentResult from '../common/TournamentResult'
import { isSamePlayerInBothSemiFinals, getPlayerFromMatchNotEqualTo } from './helpers'

const useStyles = makeStyles((theme) => ({
  scrollContainer: {
    cursor: 'grab',
    '&:active': {
      cursor: 'grabbing'
    }
  }
}))

function SingleEliminationBracket () {
  const { t } = useTranslation()
  const classes = useStyles()

  const { rounds, progressStatus, winner } = useSelector((state) => state.tournament.bracket)
  const { adminLink } = useSelector((state) => state.tournament.tournamentInfo)
  const { isUpdatingBracket, updateError } = useSelector((state) => state.tournament)
  const roundsAmount = rounds ? rounds.length : 0

  const bracketCardTitle = (
    <Typography
      align='center'
      variant='h4'
      style={{ marginBottom: '2rem' }}
    >
      {t('tournament:bracket')}
    </Typography>
  )

  if (isUpdatingBracket) {
    return (
      <>
        {bracketCardTitle}
        <Grid
          container
          justify='center'
          alignItems='flex-start'
        >
          <Spinner />
        </Grid>
      </>
    )
  }

  if (updateError) {
    return (
      <>
        {bracketCardTitle}
        <Grid
          container
          justify='center'
          alignItems='flex-start'
        >
          <Typography>
            {t('tournament:update-error')}
          </Typography>
        </Grid>
      </>
    )
  }

  if (!adminLink && progressStatus === tournamentStatusTypes.NOT_STARTED) {
    return (
      <Typography
        align='center'
        variant='h5'
      >
        {t('tournament:not-started')}
      </Typography>
    )
  }

  if (rounds.length === 0 && progressStatus === tournamentStatusTypes.NOT_STARTED) {
    return (
      <>
        {bracketCardTitle}
        <Typography
          align='center'
          variant='h5'
        >
          {t('tournament:admin-add-participants-reminder')}
        </Typography>
      </>
    )
  }

  let winnerShowcase = null
  if (winner && progressStatus === tournamentStatusTypes.FINISHED) {
    let thirdPlacePlayer1 = {}
    let thirdPlacePlayer2 = {}
    const secondPlacePlayer = rounds[roundsAmount - 1].matches[0].players.find(player => player.id !== winner.id)

    if (rounds[roundsAmount - 2]) {
      const semiFinals = rounds[roundsAmount - 2].matches
      if (isSamePlayerInBothSemiFinals(semiFinals, secondPlacePlayer.id)) {
        thirdPlacePlayer1 =
          getPlayerFromMatchNotEqualTo(semiFinals[0], winner.id, secondPlacePlayer.id) ||
          getPlayerFromMatchNotEqualTo(semiFinals[1], winner.id, secondPlacePlayer.id)
      } else if (rounds[roundsAmount - 2]) {
        thirdPlacePlayer1 = getPlayerFromMatchNotEqualTo(semiFinals[0], winner.id, secondPlacePlayer.id)
        thirdPlacePlayer2 = getPlayerFromMatchNotEqualTo(semiFinals[1], winner.id, secondPlacePlayer.id)
      }
    }

    winnerShowcase = (
      <Typography
        align='center'
        variant='h5'
      >
        <TournamentResult
          winner={winner.name}
          secondPlace={secondPlacePlayer.name}
          thirdPlacePlayer1={thirdPlacePlayer1.name}
          thirdPlacePlayer2={thirdPlacePlayer2.name}
        />
      </Typography>
    )
  }

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

  let prevRoundTopMargin = 0

  const firstRoundMatchesMargin = 32 // px
  const firstMarginTop = 24
  const width = 237 * (roundsAmount) + 200 // roundColumnWidth * roundsAmount + 200 (200 is the width of winner)
  const height = roundsAmount === 1 ? 96 + 50 : Math.pow(2, roundsAmount) / 4 * 192 + 50 // 96 = 1 match + bottom margin, 50 = header, 192 = match pair + bottom margin

  return (
    <>
      {bracketCardTitle}
      {winnerShowcase}
      <ScrollContainer vertical={false} className={classes.scrollContainer}>
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

            prevRoundTopMargin = currentRoundTopMargin
            const roundLabel = getRoundLabel(i + 1, rounds.length)

            round = {
              ...round,
              roundId: i
            }

            const roundColumn = (
              <RoundColumn
                key={`round-${i}`}
                round={round}
                label={roundLabel}
                topMargin={currentRoundTopMargin}
                matchesMargin={currentRoundMatchesMargin}
                isFinal={round.isFinal}
              />
            )
            return roundColumn
          })}
          <RoundColumn
            label={getRoundLabel(rounds.length + 1, rounds.length)}
            topMargin={prevRoundTopMargin + 16}
            matchesMargin={0}
            winnerData={winner}
            isWinner
          />
        </Grid>
      </ScrollContainer>
    </>
  )
}

export default React.memo(SingleEliminationBracket)
