const { google } = require('googleapis')
const fp = require('fastify-plugin')

module.exports = fp(function (fastify, options, next) {
  fastify.decorate('accessTokenDecorator', new Map());

  (function getJWTToken () {
    // Load the service account key JSON file.
    const serviceAccount = require('../../../firebase-auth.json')

    // Define the required scopes.
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/firebase.database'
    ]

    // Authenticate a JWT client with the service account.
    const jwtClient = new google.auth.JWT(
      serviceAccount.client_email,
      null,
      serviceAccount.private_key,
      scopes
    )

    // Use the JWT client to generate an access token.
    jwtClient.authorize(function (error, tokens) {
      if (error) {
        console.log('Error making request to generate access token:', error)
      } else if (tokens.access_token === null) {
        console.log('Provided service account does not have permission to generate access tokens')
      } else {
        const accessToken = tokens.access_token

        fastify.accessTokenDecorator.set('value', accessToken)
      }
    })
    setTimeout(getJWTToken, 3600000) // tokens expire every 1 hour so refresh is needed
  })()
  next()
})
