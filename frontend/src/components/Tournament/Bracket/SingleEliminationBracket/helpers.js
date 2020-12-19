export function isSamePlayerInBothSemiFinals (semiFinals, id) {
  return semiFinals[0].players.find(player => player.id === id) &&
    semiFinals[1].players.find(player => player.id === id)
}

export function getPlayerFromMatchNotEqualTo (match, id1, id2) {
  return match.players.find(player => player.id !== id1 && player.id !== id2)
}
