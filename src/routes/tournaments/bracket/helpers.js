function getAmountOfRounds (amountOfParticipants) {
  return Math.ceil(Math.log(amountOfParticipants) / Math.log(2))
}

function getPlayerObject (name, id, score) {
  return {
    name,
    id,
    score
  }
}

function getMatchObject (winner, players, id, isEmpty) {
  return {
    winner,
    players: players,
    id,
    isEmpty,
    isScoreReported: false
  }
}

function getPlayerScore (playerName, opponentName) {
  let playerScore = playerName ? 0 : null
  if (playerName && !opponentName) {
    playerScore = 'wait'
  }
  return playerScore
}

function getFirstRoundMatchPlayers (participantsArray, playerIndex) {
  const player1Name = participantsArray[playerIndex] ? participantsArray[playerIndex] : ''
  const player2Name = participantsArray[playerIndex + 1] ? participantsArray[playerIndex + 1] : ''

  return [
    getPlayerObject(player1Name, player1Name ? playerIndex + 1 : null, getPlayerScore(player1Name, player2Name)),
    getPlayerObject(player2Name, player2Name ? playerIndex + 2 : null, getPlayerScore(player2Name, player1Name))
  ]
}

function getMatchObjectsForFutureRoundsMatches (prevRound, matchId) {
  const isMatchEmpty = isMatchPermamentlyEmpty(prevRound, matchId)
  const players = [getPlayerObject('', null, null), getPlayerObject('', null, null)]

  return getMatchObject(null, players, matchId, isMatchEmpty)
}

function isMatchPermamentlyEmpty (prevRound, matchId) {
  if (!prevRound) {
    return true
  }
  const lastRoundUpperMatch = prevRound.matches[matchId * 2]
  const lastRoundLowerMatch = prevRound.matches[(matchId + 0.5) * 2]

  return lastRoundUpperMatch.isEmpty && lastRoundLowerMatch.isEmpty
}

function populateRoundsArrayWithPlayers (participantsArray) {
  const rounds = []
  const roundsAmount = getAmountOfRounds(participantsArray.length)

  for (let i = roundsAmount; i > 0; i--) {
    const currentRoundMatches = []
    let currentMatchId = 0
    for (let j = 0; j < Math.pow(2, i); j += 2) {
      let players = []
      let isMatchEmpty = false

      if (i === roundsAmount) { // dla pierwszej rundy wypelniam zawodnikami a pozniej juz empty
        players = getFirstRoundMatchPlayers(participantsArray, j)
        isMatchEmpty = !players[0].name && !players[1].name

        currentRoundMatches.push(getMatchObject(null, players, currentMatchId, isMatchEmpty))
      } else {
        const prevRoundId = roundsAmount - i - 1
        const prevRound = rounds[prevRoundId]
        const notFirstRoundMatch = getMatchObjectsForFutureRoundsMatches(prevRound, currentMatchId)

        currentRoundMatches.push(notFirstRoundMatch)
      }

      currentMatchId++
    }
    rounds.push({
      id: roundsAmount - i,
      isFinal: false,
      matches: currentRoundMatches
    })
  }

  rounds[rounds.length - 1] = {
    ...rounds[rounds.length - 1],
    isFinal: true
  }

  return rounds
}

module.exports = {
  getAmountOfRounds,
  populateRoundsArrayWithPlayers
}
