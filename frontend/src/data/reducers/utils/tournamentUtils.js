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

// ---------- vvvv tu useless juz ale zostawiam kod zeby w razie co mozna bylo zerknac przy pisaniu pracy jakie to problemy byly

export function getRoundsArrayWithPlayerHighlights (rounds, participantId, matchId, roundId, shouldHighlight) {
  rounds = highlightPlayerLaterInBracket(rounds, participantId, matchId, roundId, shouldHighlight)
  rounds = highlightPlayerEarlierInBracket(rounds, participantId, matchId, roundId, shouldHighlight)
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

export function updatePotentialWalkovers (rounds, winner, currentRoundId, currentMatchId) {
  while (true) {
    // if second match from the pair is empty, then the one thats being checked is a walkover
    // potrzebny bedzie update slotaw w ostatnim meczu walkowerowym
    if (rounds[currentRoundId - 1]) {
      const lastRoundUpperMatch = rounds[currentRoundId - 1].matches[currentMatchId * 2]
      const lastRoundLowerMatch = rounds[currentRoundId - 1].matches[(currentMatchId + 0.5) * 2]

      if (lastRoundUpperMatch.isEmpty && lastRoundLowerMatch.isEmpty) { // to sie chyba nawet nie moze wydarzyc xD
        break
      }

      // update the other one, not the one thats empty
      if (lastRoundUpperMatch.isEmpty) {
        rounds = produce(rounds, draft => {
          draft[currentRoundId - 1].matches[(currentMatchId + 0.5) * 2].players[0] = { ...winner, score: 'w/o' }
          draft[currentRoundId - 1].matches[(currentMatchId + 0.5) * 2].isScoreReported = true
        })

        currentMatchId = (currentMatchId + 0.5) * 2
      } else if (lastRoundLowerMatch.isEmpty) {
        rounds = produce(rounds, draft => {
          draft[currentRoundId - 1].matches[(currentMatchId + 0.5) * 2].players[0] = { ...winner, score: 'w/o' }
          draft[currentRoundId - 1].matches[currentMatchId * 2].isScoreReported = true
        })

        currentMatchId = currentMatchId * 2
      }
      currentRoundId--
    } else {
      break
    }
  }

  return rounds
}

// function updateLastWalkoverMatch (players, desiredSlot, winner, rounds, roundId, matchId) {
//   if (Array.isArray(players)) {
//     const player = players.find((player) => winner.name === player.name)

//     if (player) {
//       return produce(rounds, draft => {
//         draft[roundId].matches[matchId].players[desiredSlot] = { ...winner, score: 'w/o' }
//       })
//     }
//   }
//   return false
// }

export function getImmutablyUpdatedRoundsMatches (rounds, payload) {
  let {
    winner,
    nextRoundId,
    nextMatchId,
    nextMatchPlayerSlot,
    prevRoundId,
    prevMatchId,
    reportedPlayer1Data,
    reportedPlayer2Data
  } = payload

  console.log(nextRoundId,
    nextMatchId,
    nextMatchPlayerSlot)

  rounds = produce(rounds, draft => {
    draft[nextRoundId].matches[nextMatchId].players[nextMatchPlayerSlot] = { ...winner, score: 'w/o' }

    draft[prevRoundId].matches[prevMatchId].players[0] = reportedPlayer1Data
    draft[prevRoundId].matches[prevMatchId].players[1] = reportedPlayer2Data
    draft[prevRoundId].matches[prevMatchId].isScoreReported = true
  })

  let lastWalkoverMatchRoundId = nextRoundId
  let lastWalkoverMatchId = nextMatchId
  let lastWalkoverPlayerSlot = nextMatchPlayerSlot

  let currentRoundId = nextRoundId
  let currentMatchId = nextMatchId
  nextRoundId++
  nextMatchId = Math.floor(currentMatchId / 2)
  nextMatchPlayerSlot = currentMatchId % 2 === 0 ? 0 : 1

  do {
    // console.log('currentRoundId', currentRoundId)
    // console.log('currentMatchId', currentMatchId)
    // console.log('nextRoundId', nextRoundId)
    // console.log('nextMatchId', nextMatchId)
    // console.log('rounds[currentRoundId]', rounds[currentRoundId])
    // console.log('[currentMatchId * 2]', currentMatchId * 2)
    // console.log('[(currentMatchId + 0.5) * 2]', (currentMatchId + 0.5) * 2)
    // console.log('rounds[currentRoundId].matches[currentMatchId * 2]', rounds[currentRoundId].matches[currentMatchId * 2])
    // console.log('rounds[currentRoundId].matches[(currentMatchId + 0.5) * 2]', rounds[currentRoundId].matches[(currentMatchId + 0.5) * 2])
    const lastRoundUpperMatch = rounds[currentRoundId - 1].matches[currentMatchId * 2]
    const lastRoundLowerMatch = rounds[currentRoundId - 1].matches[(currentMatchId + 0.5) * 2]

    const isWalkover = lastRoundUpperMatch.isEmpty || lastRoundLowerMatch.isEmpty

    if (isWalkover) {
      rounds = produce(rounds, draft => {
        draft[nextRoundId].matches[nextMatchId].players[nextMatchPlayerSlot] = { ...winner, score: 'w/o' }
        draft[nextRoundId].matches[nextMatchId].isScoreReported = true
      })
      lastWalkoverMatchRoundId = nextRoundId
      lastWalkoverMatchId = nextMatchId
      lastWalkoverPlayerSlot = nextMatchPlayerSlot
    } else {
      break
    }

    currentRoundId++
    currentMatchId = Math.floor(currentMatchId / 2)
    nextRoundId++
    nextMatchId = Math.floor(currentMatchId / 2)
    nextMatchPlayerSlot = currentMatchId % 2 === 0 ? 0 : 1
  } while (true)

  if (rounds[lastWalkoverMatchRoundId].matches[lastWalkoverMatchId].players[lastWalkoverPlayerSlot].score === 'w/o') {
    rounds = produce(rounds, draft => {
      draft[lastWalkoverMatchRoundId].matches[lastWalkoverMatchId].players[lastWalkoverPlayerSlot].score = 0
      draft[lastWalkoverMatchRoundId].matches[lastWalkoverMatchId].isScoreReported = false
    })
  }

  return rounds
}
