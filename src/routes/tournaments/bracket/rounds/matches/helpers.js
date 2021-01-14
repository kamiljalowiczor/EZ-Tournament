const _ = require('lodash')

function getWinnerData (player1Data, player2Data) {
  return player1Data.score > player2Data.score
    ? { ...player1Data, score: 0 }
    : { ...player2Data, score: 0 }
}

// 'isNotFilled' because at this point match can already have a lucky loser
function isNotFilledLuckyLoserMatch (rounds, roundId, match) {
  const prevRound = rounds[roundId - 1]
  const matchId = match.id

  if (match.isFilledLuckyLoserMatch || match.isEmpty) {
    return false
  }

  const potentialAlreadyWaitingPlayerIndex = match.players.findIndex(player => player.score === 'wait')

  if (!prevRound && potentialAlreadyWaitingPlayerIndex !== -1) {
    return { matchId, luckyLoserSlot: potentialAlreadyWaitingPlayerIndex % 2 === 0 ? 1 : 0 }
  }

  if (prevRound && !rounds[roundId].isFinal) {
    const prevRoundMatchUpper = prevRound.matches[matchId * 2]
    const prevRoundMatchLower = prevRound.matches[(matchId + 0.5) * 2]

    // if a match from the previous round is empty, then there is going to be a lucky loser for the match determined by matchId
    if (prevRoundMatchUpper.isEmpty) {
      return { matchId, luckyLoserSlot: 0 }
    } else if (prevRoundMatchLower.isEmpty) {
      return { matchId, luckyLoserSlot: 1 }
    }
  }

  return false
}

function isAnyLuckyLoserMatchInRound (rounds, roundId, matches) {
  for (const match of matches) {
    const potentialLuckyLoserMatchData = isNotFilledLuckyLoserMatch(rounds, roundId, match)
    if (potentialLuckyLoserMatchData) {
      return potentialLuckyLoserMatchData
    }
  }

  return false
}

function isReportingLastMatchInRound (rounds, roundId, matches) {
  for (const match of matches) {
    // empty matches are always positioned as last in the bracket
    // if there wasn't a lucky loser up until this point then return true
    if (match.isEmpty) {
      return true
    }

    if (!match.isScoreReported && !isNotFilledLuckyLoserMatch(rounds, roundId, match)) {
      return false
    }
  }

  return true
}

function getLuckyLoser (matches, luckyLoserMatchId) {
  let potentialLuckyLosers = []

  matches.forEach(match => {
    if (match.id !== luckyLoserMatchId && !match.isEmpty) {
      const player1 = match.players && match.players[0]
      const player2 = match.players && match.players[1]

      player1.score > player2.score
        ? potentialLuckyLosers.push(player2)
        : potentialLuckyLosers.push(player1)
    }
  })

  potentialLuckyLosers = _.shuffle(potentialLuckyLosers)
  // shuffling the entire array in the beginning makes sure that the choice of a lucky loser is fair, even if multiple potential lucky losers got the same scores in the same round
  // consider:
  // if (luckyLoser.score === player.score) { luckyLoser = getRandomWinner(luckyLoser.name, player.name) }
  // this way would always favor last placed player in round, because he would have to get determined by this function as a winner, only one time, whereas previous players would need multiple random 50/50 'wins'

  let luckyLoser = potentialLuckyLosers[0]

  for (let i = 1; i < potentialLuckyLosers.length; i++) {
    const loser = potentialLuckyLosers[i]

    if (loser.score > +luckyLoser.score) {
      luckyLoser = loser
    }
  }

  luckyLoser.name = `${luckyLoser.name} (LL)`

  return luckyLoser
}

function isPlayerFromPairWaiting (players) {
  return players.find(player => player.score === 'wait')
}

function getUpdatedLuckyLosersMatch (luckyLoser, match, luckyLoserSlot) {
  const secondPlayerFromPairId = luckyLoserSlot % 2 === 0 ? 1 : 0

  if (isPlayerFromPairWaiting(match.players)) {
    match.players[luckyLoserSlot] = { ...luckyLoser, score: 0 }
    match.players[secondPlayerFromPairId].score = 0
  } else {
    match.players[luckyLoserSlot] = { ...luckyLoser, score: 'wait' }
  }

  match.isFilledLuckyLoserMatch = true

  return match
}

function updateLuckyLoser (rounds, roundId) {
  const matches = rounds[roundId].matches

  const luckyLoserMatchData = isAnyLuckyLoserMatchInRound(rounds, roundId, matches)

  if (_.isNumber(luckyLoserMatchData.matchId) &&
      isReportingLastMatchInRound(rounds, roundId, matches
      )) {
    const luckyLoser = getLuckyLoser(matches, luckyLoserMatchData.matchId)
    const updatedMatch = getUpdatedLuckyLosersMatch(luckyLoser, matches[luckyLoserMatchData.matchId], luckyLoserMatchData.luckyLoserSlot)

    matches[luckyLoserMatchData.matchId] = updatedMatch
  }

  return rounds
}

function updateScores (rounds, roundId, matchId, matchPlayerSlot, winnerData, isFinal) {
  // no next match, so just return
  if (isFinal) {
    return rounds
  }

  // check and potentially update lucky loser
  rounds = updateLuckyLoser(rounds, roundId)

  // update the coresponding match in the next round
  const nextRoundId = roundId + 1
  const nextMatchId = Math.floor(matchId / 2)

  rounds = updateNextMatch(rounds, winnerData, nextRoundId, nextMatchId, matchPlayerSlot)

  return rounds
}

function updateNextMatch (rounds, winnerData, nextRoundId, nextMatchId, matchPlayerSlot) {
  rounds[nextRoundId].matches[nextMatchId].players[matchPlayerSlot] = winnerData

  if (isPlayerFromPairWaiting(rounds[nextRoundId].matches[nextMatchId].players)) {
    rounds[nextRoundId].matches[nextMatchId].players.forEach(player => { player.score = 0 })
  } else {
    rounds[nextRoundId].matches[nextMatchId].players[matchPlayerSlot].score = 'wait'
  }

  rounds[nextRoundId].matches[nextMatchId].isScoreReported = false

  return rounds
}

module.exports = {
  getWinnerData,
  updateScores
}
