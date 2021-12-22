const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


const initialBlogs = [
  {
    title: "Title A",
    author: "Author A",
    url: "www.urlA.com",
    likes: 12,
    blogs: []
  },
  {
    title: "Title B",
    author: "Author B",
    url: "www.urlB.com",
    likes: 18,
    blogs: []
  },
  {
    title: "Title C",
    author: "Author C",
    url: "www.urlC.com",
    likes: 9,
    blogs: []
  }

]

const initialUsers = [
  {
    username: "mars",
    name: "Martiniano",
    password: "12345678"
  },
  {
    username: "jose",
    name: "Josefina",
    password: "12345678"
  },
  {
    username: "ana",
    name: "Ana",
    password: "12345678"
  }

]



const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const tokenHelp = async () => {
  const userTest = initialUsers[0]
  const userLoggedIn = await api.post('/api/login').send(userTest)

  const token = userLoggedIn.body.token

  return token
}

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb,
  tokenHelp
}