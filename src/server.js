const port = process.env.PORT || 3000 // remember to declare env PORT for heroku
const app = require('./app')({
  port
})
// Run the server!
const start = async () => {
  try {
    await app.listen({ port, host: '0.0.0.0' })
    app.log.info(`server listening on ${app.server.address().port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
