const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const _ = require('lodash');

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const saltRounds = 10

  for (let user of helper.initialUsers) {
    const passwordHash = await bcrypt.hash(user.password, saltRounds)
    user.passwordHash = passwordHash
    let userObject = new User(user)
    await userObject.save()
  }

  const response = await api.get('/api/users')
  const user = response.body[0]


  for (let blog of helper.initialBlogs) {
    blog.user = user.id
    let blogObject = new Blog(blog)
    const blogSaved = await blogObject.save()
    user.blogs = user.blogs.concat(blogSaved._id)
  }
  // await user.save() 

}, 100000)

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


  expect(_.has(firstBlog, 'id')).toBeTruthy()
})

test('it creates a new blog', async () => {
  const token = await helper.tokenHelp()

  const newBlog = {
    title: "Blog Test",
    author: "Test author",
    url: "www.test.com",
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('Blog Test')
})

test('if likes are missing default to 0', async () => {
  const token = await helper.tokenHelp()

  const newBlog = {
    title: "Blog Test",
    author: "Test author",
    url: "www.test.com",
  }

  const createdBlog = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)

  expect(createdBlog.body.likes).toBe(0)
})

test('if title OR url are missing response should be 400', async () => {
  const token = await helper.tokenHelp()

  const newBlogNoUrl = {
    title: "Blog Test",
    author: "Test author",
    likes: 10
  }

  const createdBlog = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlogNoUrl)
    .expect(400)
})

describe('deletion of a note', () => {
  test('success with status code 204 if id is valid', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]

    const token = await helper.tokenHelp()

    await api
      .delete(`/api/blogs/${firstBlog.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await (await api.get('/api/blogs')).body

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

  })
})

describe('update of a blog', () => {
  test('success by updating a blog with valid id', async () => {
    const response = await api.get('/api/blogs')

    const firstBlog = response.body[0]

    const newBlogInfo = {
      title: "Updated Title",
      author: "Updated Author",
      url: "www.updatedurl.com",
      likes: 20
    }

    const updatedBlog = await api
      .put(`/api/blogs/${firstBlog.id}`)
      .send(newBlogInfo)

    expect(updatedBlog.body.title).toBe(newBlogInfo.title)
  })
})
