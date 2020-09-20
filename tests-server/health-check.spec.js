/* globals beforeAll, afterAll, describe, test, expect */
const app = require('./../src/app.js')

// Start application before running the test case
describe('/.well-known/health-check', function () {
  let instance
  beforeAll(async () => {
    instance = await app({ port: 3000 }).ready()
  })

  // Stop application after running the test case
  afterAll(async () => {
    instance.stop()
  })

  describe('GET method', () => {
    test('should return status code 200 and OK', async function () {
      const result = await instance.inject({
        method: 'GET',
        url: '/.well-known/health-check'
      })

      expect(result.statusCode).toBe(200)
      expect(JSON.parse(result.payload)).toEqual({
        message: 'OK'
      })
    })
  })
})
