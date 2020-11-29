import produce from 'immer'

export function getParticipantsArray (inputValue) {
  const participantsArray = inputValue.trim().replace(/,/g, '\n').split('\n')
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

export const deepCopy = inObject => {
  if (typeof inObject !== 'object' || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  const outObject = Array.isArray(inObject) ? [] : {}

  for (const key in inObject) {
    const value = inObject[key]

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = (typeof value === 'object' && value !== null) ? deepCopy(value) : value
  }

  return outObject
}

export function getRoundsArrayWithPlayerHighlights (rounds, participantId, matchId, roundId, shouldHighlight) {
  rounds = highlightPlayerLaterInBracket(rounds, participantId, matchId, roundId, shouldHighlight)
  rounds = highlightPlayerEarlierInBracket(rounds, participantId, matchId, roundId, shouldHighlight)
  return rounds
}

export function highlightPlayerLaterInBracket (rounds, participantId, matchId, roundId, shouldHighlight) {
  while (rounds[roundId]) {
    let isParticipantFound = false
    const matchPlayers = rounds[roundId].matches[matchId].players

    for (let i = 0; i < matchPlayers.length; i++) {
      if (matchPlayers[i].id === participantId) {
        rounds[roundId].matches[matchId].players[i] = {
          ...matchPlayers[i],
          isHighlighted: shouldHighlight
        }

        if (i % 2 === 0) {
          matchId = matchId * 2
          roundId = roundId - 1
        } else {
          matchId = (matchId + 0.5) * 2
          roundId = roundId - 1
        }

        isParticipantFound = true
        break
      }
    }

    if (!isParticipantFound) {
      return rounds
    }
  }
  return rounds
}

export function highlightPlayerEarlierInBracket (rounds, participantId, matchId, roundId, shouldHighlight) {
  while (rounds[roundId]) {
    let isParticipantFound = false
    const matchPlayers = rounds[roundId].matches[matchId].players

    for (let i = 0; i < matchPlayers.length; i++) {
      if (matchPlayers[i].id === participantId) {
        rounds[roundId].matches[matchId].players[i] = {
          ...matchPlayers[i],
          isHighlighted: shouldHighlight
        }

        matchId = Math.floor(matchId / 2)
        roundId = roundId + 1

        isParticipantFound = true
        break
      }
    }

    if (!isParticipantFound) {
      return rounds
    }
  }
  return rounds
}
