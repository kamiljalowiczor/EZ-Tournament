/* globals beforeAll, afterAll, describe, test, expect */

const app = require('../src/app.js')

describe('/*', () => {
  let instance
  beforeAll(async () => {
    instance = await app({ port: 3000 }).ready()
  })

  afterAll(async () => {
    instance.stop()
  })

  describe('GET any url not starting with /api/', () => {
    test('should not return status code 404', async () => {
      const result = await instance.inject({
        method: 'GET',
        url: '/authors'
      })

      expect(result.statusCode).not.toBe(404)
    })
  })
})
