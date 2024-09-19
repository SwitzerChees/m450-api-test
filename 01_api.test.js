const request = require('supertest');

const baseUrl = 'https://dummyjson.com'

describe('Check API', () => {
    test('Check /test endpoint', async () => {
        const response = await request(baseUrl).get('/test')
        expect(response.statusCode).toBe(200)
    })
})