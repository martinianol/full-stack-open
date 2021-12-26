import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, prettyDOM } from '@testing-library/react'
import Blog from '../Blog'

test('renders content', () => {
  const blog = {
    url: 'www.test.com',
    likes: 10,
    user: {
      username: 'userNameTest',
      user: 'userTest',
      id: 1
    },
    title: 'Test title',
    author: 'Test Author'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const blogToTest = component.container.querySelector('.blog')

  console.log(prettyDOM(blogToTest))

  expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)

})
