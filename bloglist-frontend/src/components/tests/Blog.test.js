import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../Blog'
import { prettyDOM } from '@testing-library/dom'

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

test('renders content', () => {

  const component = render(
    <Blog blog={blog} />
  )

  const blogToTest = component.container.querySelector('.blog')

  console.log(prettyDOM(blogToTest))

  expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)

})

  / test('clicking the like button twice calls event handler passed as props twice', () => {

    const user = {
      blogs: []
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} user={user} onUpdate={mockHandler} />
    )
    const buttonDetails = component.getByText('view details')
    fireEvent.click(buttonDetails)

    const buttonLike = component.getByText('like')

    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
