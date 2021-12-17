const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const favBlog = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  }) //returns object
  return favBlog
}

const mostBlogs = (blogs) => {
  const authorsQty = _.countBy(blogs, element => element.author)
  console.log(authorsQty)

  const author = Object.keys(authorsQty).reduce((prev, current) => authorsQty[prev] > authorsQty[current] ? prev : current);
  console.log(author)

  const authorObj = {
    author: author,
    blogs: authorsQty[author]
  }
  console.log(authorObj)


  return authorObj
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}