const axios = require('axios')
const short = require('short-uuid')

async function newTournament (req, reply) {
  let payload = null
  const databaseUrl = this.config.DATABASE_URL

  let publicLink = req.body.customUrl ? req.body.customUrl : short.generate()

  if (!req.body.customUrl) {
    let retriesAmount = 0
    while (true) {
      const checkUrlRes = await axios.get(`${databaseUrl}/tournaments/${publicLink}.json`)
      if (!checkUrlRes.data) {
        break
      }

      if (retriesAmount === 5) {
        reply.code(408)
        payload = { error: '408 Request Timeout' }
        reply.send(payload)
        return
      }
      publicLink = short.generate()
      retriesAmount++
    }
  }

  const adminLink = short.generate()

  const tournamentData = {
    publicLink,
    adminLink,
    name: req.body.name,
    host: req.body.host,
    description: req.body.description,
    contact: req.body.contact
  }

  payload = tournamentData

  await axios.put(`${databaseUrl}/tournaments/${publicLink}/info.json?`, tournamentData)
    .then(() => {
      payload = tournamentData
      reply.code(200)
    })
    .catch(() => {
      payload = { error: '502 Bad Gateway' }
      reply.code(502)
    })

  reply.send(payload)
}

async function getTournament (req, reply) {
  let payload = null
  const databaseUrl = this.config.DATABASE_URL

  const tournamentId = req.params.id
  const adminId = req.query.adminId

  let tournamentData
  await axios.get(`${databaseUrl}/tournaments/${tournamentId}.json`)
    .then((dbRes) => {
      tournamentData = dbRes.data
    })
    .catch(() => {
      payload = { error: '502 Bad Gateway' }
      reply.code(502)
    })

  if (adminId !== tournamentData.info.adminLink) {
    tournamentData.info.adminLink = ''
  }

  payload = tournamentData
  reply.send(payload)
}

module.exports = {
  newTournament,
  getTournament
}
