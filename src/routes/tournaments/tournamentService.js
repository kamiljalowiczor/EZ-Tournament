const axios = require('axios')
const short = require('short-uuid')

const tournamentStatusTypes = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED'
}

async function newTournament (req, reply) {
  reply.header('Cache-Control', 'no-store, max-age=0')
  let payload = null
  const databaseUrl = this.config.DATABASE_URL

  let publicLink = req.body.customUrl ? req.body.customUrl : short.generate()

  if (!req.body.customUrl) {
    let retriesAmount = 0
    while (true) {
      const checkUrlRes = await axios.get(`${databaseUrl}/tournaments/${publicLink}.json?access_token=${this.accessTokenDecorator.get('value')}`)

      if (!checkUrlRes.data) {
        break
      }

      if (retriesAmount === 4) {
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
    info: {
      publicLink,
      adminLink,
      name: req.body.name,
      host: req.body.host,
      description: req.body.description,
      contact: req.body.contact
    },
    bracket: {
      progressStatus: tournamentStatusTypes.NOT_STARTED
    }
  }

  payload = tournamentData

  await axios.put(`${databaseUrl}/tournaments/${publicLink}.json?access_token=${this.accessTokenDecorator.get('value')}`, tournamentData)
    .then(() => {
      payload = tournamentData
      reply.code(200)
    })
    .catch((err) => {
      payload = { error: err.statusText || 'Bad Request' }
      reply.code(err.status || 400)
      reply.send()
    })

  reply.send(payload)
}

async function getTournament (req, reply) {
  reply.header('Cache-Control', 'no-store, max-age=0')
  let payload = null
  const databaseUrl = this.config.DATABASE_URL

  const tournamentId = req.params.tournamentId

  const isUrlCheck = req.query.isUrlCheck
  const adminId = req.query.adminId

  let tournamentData

  await axios.get(`${databaseUrl}/tournaments/${tournamentId}.json?access_token=${this.accessTokenDecorator.get('value')}`, { headers: { 'Content-Type': 'text/plain' } })
    .then((dbRes) => {
      tournamentData = dbRes.data

      if (isUrlCheck) {
        payload = tournamentData
          ? { isUrlAvailable: false }
          : { isUrlAvailable: true }
        reply.code(200)
        reply.send(payload)
      } else if (!tournamentData && !isUrlCheck) {
        reply.code(404)
        reply.send({
          error: 'Data not found'
        })
      }
    })
    .catch((err) => {
      payload = { error: err.statusText || 'Bad Request' }
      reply.code(err.status || 400)
      reply.send()
    })
  if (reply.sent) return

  if (tournamentData && tournamentData.info) {
    if (adminId !== tournamentData.info.adminLink) {
      tournamentData.info.adminLink = ''
    }
  }

  payload = tournamentData
  reply.send(payload)
}

module.exports = {
  newTournament,
  getTournament,
  tournamentStatusTypes
}
