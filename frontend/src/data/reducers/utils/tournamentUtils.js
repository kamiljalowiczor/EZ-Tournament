export function getParticipantsArray (inputValue) {
  const participantsArray = inputValue.trim().split('\n')
  for (let i = 0; i < participantsArray.length; i++) {
    participantsArray[i] = participantsArray[i].trim().substring(0, 15).replace(/\s\s+/g, ' ')
  }

  return participantsArray.filter(Boolean)
}

export function populateRoundsArrayWithPlayers (participantsArray, roundsAmount) {
  const rounds = []

  for (let i = roundsAmount; i > 0; i--) {
    const thisRoundMatches = []
    for (let j = 0; j < Math.pow(2, i); j += 2) {
      if (i === roundsAmount) {
        thisRoundMatches.push({
          players: [
            {
              name: participantsArray[j] ? participantsArray[j] : '',
              id: j + 1
            },
            {
              name: participantsArray[j + 1] ? participantsArray[j + 1] : '',
              id: j + 2
            }
          ]
        })
      } else {
        thisRoundMatches.push({
          players: [{ name: `runda: ${i}, mecz: ${j} ; 1` }, { name: `runda: ${i}, mecz: ${j} ; 1` }]
        })
      }
    }
    rounds.push({ matches: thisRoundMatches })
  }

  rounds[rounds.length - 1] = {
    ...rounds[rounds.length - 1],
    isFinal: true
  }

  return rounds
}
