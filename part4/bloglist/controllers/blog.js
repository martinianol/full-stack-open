const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const { title, author, url, likes } = request.body

  if (!request.body.likes) {
    request.body.likes = 0
  }

  if (!request.body.url || !request.body.title) {
    return response.status(400).send()
  }
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  const blogSaved = await blog.save()
  user.blogs = user.blogs.concat(blogSaved._id)
  await user.save()

  response.status(201).json(blogSaved)

})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = await Blog.findById(id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(id)
    return response.status(204).end()
  }

  return response.status(401).json({ error: 'blog was not created by user' })

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const id = request.params.id

  if (!body.likes) {
    body.likes = 0
  }

  if (!body.url || !body.title) {
    return response.status(400).send()
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }


  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })

  response.json(updatedBlog)
})

module.exports = blogsRouter