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

  const author = Object.keys(authorsQty).reduce((prev, current) => authorsQty[prev] > authorsQty[current] ? prev : current);

  const authorObj = {
    author: author,
    blogs: authorsQty[author]
  }

  return authorObj
}

const mostLikes = (blogs) => {

  const blogsUniq = _.uniqBy(blogs, element => element.author)

  const authors = blogsUniq.map(element => element.author)

  const authorsLikes = authors.map(author => {
    let countLikes = 0
    blogs.forEach(blog => {
      if (blog.author === author) {
        countLikes = countLikes + blog.likes
      }
    })
    return { author: author, likes: countLikes }
  })

  const authorMaxLikes = _.maxBy(authorsLikes, o => o.likes);

  return authorMaxLikes

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}