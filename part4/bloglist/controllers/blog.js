const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
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
    user: '61c100bc0fdba86a89a495e0'
  })

  const result = await blog.save()
  response.status(201).json(result)

})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Blog.findByIdAndRemove(id)
  response.status(204).end()
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