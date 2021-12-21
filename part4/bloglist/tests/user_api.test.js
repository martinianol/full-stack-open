const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const _ = require('lodash');

const User = require('../models/user')
const { TestWatcher } = require('jest')

beforeEach(async () => {
  await User.deleteMany({})

  for (let user of helper.initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }

})

afterAll(() => {
  mongoose.connection.close()
})

/**
 * Tests
 */

describe('users creation', () => {
  test('invalid user no name is not created', async () => {
    const newUser = {
      username: "jose",
      name: "",
      password: 12345678
    }
    await api.post('/api/users').send(newUser)
      .expect(400)
  })
  test('invalid user short password is not created', async () => {
    const newUser = {
      username: "jose",
      name: "Josefina",
      password: "12"
    }
    await api.post('/api/users').send(newUser)
      .expect(400)
  })

})