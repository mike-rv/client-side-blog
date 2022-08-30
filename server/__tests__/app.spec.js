const app = require('../app')
const request = require('supertest');

describe('api server', () => {
    let api;
    
    beforeAll(() => {
        api = app.listen(5000, () => {
            console.log('Test server running on port 5000')
        })
    })

    afterAll((done) => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    test('it responds to get / with a 200 status', (done) => {
        request(api)
            .get('/')
            .expect(200, done)
    })

    test('it responds to get /1 with a 200 status', (done) => {
        request(api)
            .get('/1')
            .expect(200, done)
    })

    test('it responds to get /0 with a 404 status', (done) => {
        request(api)
            .get('/0')
            .expect(404, done)
    })

    test('it responds to get /1/comments with a 200 status', (done) => {
        request(api)
            .get('/1/comments')
            .expect(200, done)
    })

    test('it responds to get /0/comments with a 404 status', (done) => {
        request(api)
            .get('/0/comments')
            .expect(404, done)
    })

    test('responds to post / with status 201', (done) => {
        const testData = {
            post: 'We will never be the new facebook if we can\'t even make posts properly'
        }

        request(api)
            .post('/')
            .send(testData)
            .set('Accept', 'application/json')
            .expect(201, done)
    })

    test('responds to post /1/ with status 201', (done) => {
        const testData = {
            comment: 'We will never be the new facebook if we can\'t even comment properly'
        }

        request(api)
            .post('/1')
            .send({ testData })
            .set('Accept', 'application/json')
            .expect(201, done)
    })
})
