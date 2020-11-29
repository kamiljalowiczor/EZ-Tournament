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

function getMatchObject (winner, players, id) {
  return {
    winner,
    players,
    id
  }
}

function populateRoundsArrayWithPlayers (participantsArray, roundsAmount) {
  const rounds = []

  for (let i = roundsAmount; i > 0; i--) {
    const currentRoundMatches = []
    let currentMatchId = 0
    for (let j = 0; j < Math.pow(2, i); j += 2) {
      const player1Name = participantsArray[j] ? participantsArray[j] : ''
      const player2Name = participantsArray[j + 1] ? participantsArray[j + 1] : ''
      const players =
        i === roundsAmount
          ? [
            getPlayerObject(player1Name, j + 1, player1Name ? 0 : null),
            getPlayerObject(player2Name, j + 2, player2Name ? 0 : null)
          ]
          : [
            getPlayerObject('', null, null),
            getPlayerObject('', null, null)
          ]
      currentRoundMatches.push(getMatchObject(null, players, currentMatchId))
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
