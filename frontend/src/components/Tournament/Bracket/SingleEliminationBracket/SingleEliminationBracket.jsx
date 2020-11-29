import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import ScrollContainer from 'react-indiana-drag-scroll'
import RoundColumn from './RoundColumn'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { tournamentStatusTypes } from '../../../../common/constants/tournamentStatus'
import Spinner from '../../../Utils/Spinner'

function SingleEliminationBracket () {
  const { t } = useTranslation()
  const { rounds, progressStatus, winner } = useSelector((state) => state.tournament.bracket)
  const { adminLink } = useSelector((state) => state.tournament.tournamentInfo)
  const { isUpdatingBracket, updateError } = useSelector((state) => state.tournament)
  const roundsAmount = rounds.length

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

  const bracketCardTitle = (
    <Typography
      align='center'
      variant='h4'
      style={{ marginBottom: '2rem' }}
    >
      {t('tournament:bracket')}
    </Typography>
  )

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
    winnerShowcase = (
      <Typography
        align='center'
        variant='h5'
      >
        TOURNAMENT WINNER: {winner.name}
        <br />
        todo: wez jakies ladne zrob
        <br />
        <br />
      </Typography>
    )
  }

  console.log('render')
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

  const firstRoundMatchesMargin = 32 // in px
  const firstMarginTop = 160 / 4 - 16 // wysokosc pary / 4 - jeden zawodnik
  const width = 237 * (roundsAmount) + 200 // roundColumnWidth * roundsAmount + 200 (200 czyli szerokosc winnera)
  const height = roundsAmount === 1 ? 192 + 50 : Math.pow(2, roundsAmount) / 4 * 192 + 50 // 160 to wysokosc dwoch meczow obok siebie + 32 margin bottom, + 50 zeby round header sie zmiescil

  if (isUpdatingBracket || updateError) {
    return (
      <>
        {bracketCardTitle}
        <Grid
          container
          justify='center'
          alignItems='flex-start'
        >
          {isUpdatingBracket && <Spinner />}
          {updateError &&
            <Typography>
              {t('tournament:update-error')}
            </Typography>}
        </Grid>
      </>
    )
  }

  return (
    <>
      {bracketCardTitle}
      {winnerShowcase}
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
