const _ = require('lodash')

function getWinnerData (player1Data, player2Data) {
  return player1Data.score > player2Data.score
    ? { ...player1Data, score: 0 }
    : { ...player2Data, score: 0 }
}

// not filled bo sprawdzane jest tez czy juz tam nie ma w tym meczu lucky lucka zgloszonego
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
    // zalozenie jest takie ze jezeli ktorys z meczow z pary w ostatniej rundzie jest empty to bedzie luckyloser dla meczu tego co mam matchId tutaj

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
    if (match.isEmpty) { // empty zawsze bedzie na dole wiec jezeli doszlismy do tego momentu i nie bylo walkowera to juz nie bedzie
      return true
    }

    if (!match.isScoreReported && !isNotFilledLuckyLoserMatch(rounds, roundId, match)) { // jezeli nie jest zaraportowany to tez nie trzeba dalej szukac - musza byc wszystkie zaraportowane excluding luckylosermatch
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
  // ^^ cheeky linia ale wytlumaczenie:
  // przemieszanie calej tablicy na poczatku jest po to zeby nie faworyzowac zadnego gracza w przypadku gdy pare osob bedzie mialo takie samo wyniki w rundzie
  // jezeli bym wybieral lucky losera na podstawie:
  // if (luckyloser.score === player.score) { math.random(ktory wygral) }
  // to bylo by to kompletnie bez sensu bo to by oznaczalo faworyzowanie ostatniego gracza z drabinki, ktory uzyskal taki sam rezultat jak paru innych
  // ci wczesniejsi by musieli 'wygrac' pare walk 50/50, a ten ostatni tylko jedna

  let luckyLoser = potentialLuckyLosers[0]

  for (let i = 1; i < potentialLuckyLosers.length; i++) { // zaczynam od 1 bo zerowy jest od razu jako luckyLoser wiec nie ma sensu go z samym soba porywnywac
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
  // NO NEXT MATCH JUST RETURN
  if (isFinal) {
    return rounds
  }

  // UPDATE THE SCORE FOR THE NEXT MATCH
  rounds = updateLuckyLoser(rounds, roundId)

  const nextRoundId = roundId + 1
  const nextMatchId = Math.floor(matchId / 2)

  rounds = updateNextMatch(rounds, winnerData, nextRoundId, nextMatchId, matchPlayerSlot)

  return rounds
}

function updateNextMatch (rounds, winnerData, nextRoundId, nextMatchId, matchPlayerSlot) {
  // NO SPECIAL CONDITIONS, SO JUST UPDATE THE NEXT MATCH IN LINE AS USUAL
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
  // updateWalkoverMatches,
  getWinnerData,
  updateScores
}
