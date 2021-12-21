const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Title A",
    author: "Author A",
    likes: 12
  },
  {
    title: "Title B",
    author: "Author B",
    likes: 18
  },
  {
    title: "Title C",
    author: "Author C",
    likes: 9
  }

]

const initialUsers = [
  {
    username: "mars",
    name: "Martiniano",
    password: 12345678
  },
  {
    username: "jose",
    name: "Josefina",
    password: 12345678
  },
  {
    username: "ana",
    name: "Ana",
    password: 12345678
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

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb
}