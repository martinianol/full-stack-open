const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const blogs = [{
      title: "Test Blog",
      author: "Test Author",
      url: "www.test.com",
      likes: 20
    }]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(blogs[0].likes)
  })
  test('of a larger list is calculated right', () => {
    const blogs = [{ likes: 20 }, { likes: 20 }, { likes: 20 }
    ]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(60)
  })
  test('blog with most likes', () => {

    const blogA = {
      title: "Title A",
      author: "Author A",
      likes: 12
    }
    const blogB = {
      title: "Title B",
      author: "Author B",
      likes: 18
    }
    const blogC = {
      title: "Title C",
      author: "Author C",
      likes: 9
    }
    const blogs = [blogA, blogB, blogC]

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogB)
  })
})