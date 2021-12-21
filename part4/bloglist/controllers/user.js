const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.name || !body.user) {
    return response.status(400).send({ error: 'name or username missing' })
  }

  if (body.password.length < 3) {
    return response.status(400).send({ error: 'password length needs 3 characters min' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })


  const savedUser = await user.save()
  response.json(savedUser)


})



module.exports = usersRouter