const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const _ = require('lodash');

const Blog = require('../models/blog')



beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

})

afterAll(() => {
  mongoose.connection.close()
})

/**
 * Tests
 */

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('there is an id property', async () => {
  const response = await api.get('/api/blogs')

  const firstBlog = response.body[0]
  console.log(firstBlog)

  expect(_.has(firstBlog, 'id')).toBeTruthy()
})

test('it creates a new blog', async () => {

  const newBlog = {
    title: "Blog Test",
    author: "Test author",
    url: "www.test.com",
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)

  expect(titles).toContain('Blog Test')





})