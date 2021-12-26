import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlog from '../CreateBlog'
import { prettyDOM } from '@testing-library/dom'


test('the event handler is called if the Blog has correct details', () => {

  const mockHandler = jest.fn()

  const blogObject = {
    title: 'Test title',
    author: 'Test author',
    url: 'www.test.com'
  }

  const component = render(
    <CreateBlog createBlog={mockHandler} />
  )
  const form = component.container.querySelector('form')

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: blogObject.title }
  })
  fireEvent.change(author, {
    target: { value: blogObject.author }
  })
  fireEvent.change(url, {
    target: { value: blogObject.url }
  })
  fireEvent.submit(form)


  expect(mockHandler.mock.calls).toHaveLength(1)

})

test('the event handler is NOT called if the Blog has NOT correct details', () => {
  const mockHandler = jest.fn()

  const blogObject = {
    title: '',
    author: 'Test author',
    url: 'www.test.com'
  }

  const component = render(
    <CreateBlog createBlog={mockHandler} />
  )
  const form = component.container.querySelector('form')

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: blogObject.title }
  })
  fireEvent.change(author, {
    target: { value: blogObject.author }
  })
  fireEvent.change(url, {
    target: { value: blogObject.url }
  })
  fireEvent.submit(form)


  expect(mockHandler.mock.calls).toHaveLength(0)
})