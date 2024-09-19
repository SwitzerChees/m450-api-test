const request = require('supertest');

const baseUrl = 'https://dummyjson.com'

describe('Check Products API', () => {
    test('Get single product', async () => {
        const response = await request(baseUrl).get('/product/1')
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBe(1)
        expect(response.body.title).toBeDefined()
    })

    test('Get Products with limit', async () => {
        const response = await request(baseUrl).get('/products?limit=5')
        expect(response.statusCode).toBe(200)
        expect(response.body.products.length).toBe(5)
    })

    test('Get Products with limit and skip', async () => {
        const firstReponse = await request(baseUrl).get('/products?limit=5&skip=5')
        expect(firstReponse.statusCode).toBe(200)
        expect(firstReponse.body.products.length).toBe(5)
        const secondResponse = await request(baseUrl).get('/products?limit=5&skip=10')
        expect(secondResponse.statusCode).toBe(200)
        expect(secondResponse.body.products.length).toBe(5)
        const firstProducts = firstReponse.body.products
        const secondProducts = secondResponse.body.products
        firstProducts.forEach((product, index) => {
            expect(product.id).not.toBe(secondProducts[index].id)
        })
    })

    test('Get products order by price ASC', async () => {
        const response = await request(baseUrl).get('/products?sortBy=price&order=asc')
        expect(response.statusCode).toBe(200)
        const products = response.body.products
        let lastPrice = 0
        products.forEach(product => {
            expect(product.price).toBeGreaterThanOrEqual(lastPrice)
            lastPrice = product.price
        })
    })

    test('Get products order by price DESC', async () => {
        const response = await request(baseUrl).get('/products?sortBy=price&order=desc')
        expect(response.statusCode).toBe(200)
        const products = response.body.products
        let lastPrice = 999999999
        products.forEach(product => {
            expect(product.price).toBeLessThanOrEqual(lastPrice)
            lastPrice = product.price
        })
    })
})