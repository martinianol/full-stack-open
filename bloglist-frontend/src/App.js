import React, { useState, useEffect, useRef } from 'react'
import { setNotification } from './reducers/notificationReducer'
import { setError } from './reducers/errorReducer'
import { setUser, getUserLocalStorage } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
/* import Blog from './components/Blog' */
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Message from './components/Message'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


import _ from 'lodash'
import { initializeBlogs, createBlog, setBlogs } from './reducers/blogsReducer'

const App = () => {
  const notification = useSelector(state => state.notification)
  const error = useSelector(state => state.error)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    (async () => {
      dispatch(setBlogs())
    })()
  }, [user])

  useEffect(() => {
    getUserLocalStorage()
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('loggedBlogeappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))

    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5))
      dispatch(setError(true))
    }

  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(setUser(null))
  }

  const addBlog = async (blogObject) => {

    const returnedBlog = await blogService.create(blogObject)
    dispatch(createBlog(returnedBlog))
    blogFormRef.current.toggleVisibility()
    user.blogs = user.blogs.concat(returnedBlog.id)
    dispatch(setUser(user))
    dispatch(setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 5))
  }



  return (
    <div>
      {
        notification !== null && <Message message={notification} isError={error} />
      }
      {user === null ?
        <LoginForm
          onSubmit={handleLogin}
        />
        :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <Togglable
            buttonLabel="Create new blog"
            ref={blogFormRef}>
            <CreateBlog
              createBlog={addBlog}
            />
          </Togglable>
          <BlogList user={user} />
        </div>
      }
    </div>
  )
}

export default App