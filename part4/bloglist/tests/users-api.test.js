const { JsonWebTokenError } = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)
const User = require('../models/user')


const oneUser = {
    username: 'Jam2',
    name: 'Donald Jackson',
    password: 'dsa123'
}

describe('save user to database and try to save user and fail with correct error codes', () => {
    beforeEach(async () => {
        await User.deleteMany({name:'Donald Jackson'})

        let basicUser = new User(oneUser)
        await basicUser.save()
    })
    test('should save user to database that does not exist', async () => {
        const newUser = {
            username: 'Gonnis12',
            name: 'Donald Jackson',
            password: 'asd123'
          }
      
          await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')

        const contents = response.body.map(r => r.username)
      
        expect(contents).toContain(
          'Gonnis12'
        )
    })

    test('should fail saving user with proper error code', async () => {
        jest.setTimeout(8000)
        const existingUser = {
            username: 'Jam2',
            name: 'Donald Jackson',
            password: 'asd123'
          }
      
        let userExists = await api
            .post('/api/users')
            .send(existingUser)
            .expect(400)

        expect(userExists.body.error).toContain('Username already exists.')

        const wrongLengthUsername = {
            username: 'Ja',
            name: 'Eric Cartman',
            password: '123333'
        }

        let usernameWrong = await api
            .post('/api/users')
            .send(wrongLengthUsername)
            .expect(400)

        expect(usernameWrong.body.error).toContain('Username and password must be atleast 3 characters.')

        const passwordDoesNotExist = {
            username: 'Jammies',
            name: 'Eric Postman'
        }

        let invalidPassword = await api
            .post('/api/users')
            .send(passwordDoesNotExist)
            .expect(400)

        expect(invalidPassword.body.error).toContain('Username and password must be defined.')
    })
})





afterAll(() => {
    mongoose.connection.close()
})

