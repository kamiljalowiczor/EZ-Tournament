export function getAmountOfRounds (amountOfParticipants) {
  return Math.ceil(Math.log(amountOfParticipants) / Math.log(2))
}
