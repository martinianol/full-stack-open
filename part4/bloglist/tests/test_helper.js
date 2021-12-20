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


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}