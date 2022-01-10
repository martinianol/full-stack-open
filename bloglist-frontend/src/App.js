import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'


import { setNotification } from './reducers/notificationReducer'
import { setError } from './reducers/errorReducer'
import { setUser, getUserLocalStorage } from './reducers/userReducer'
import { setBlogs, setRemoveBlog } from './reducers/blogsReducer'
import { setUsers } from './reducers/usersReducer'


import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import Message from './components/Message'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import NavBar from './components/Navbar'
import User from './components/User'

const App = () => {
  const notification = useSelector(state => state.notification)
  const error = useSelector(state => state.error)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  console.log('users', users)
  const blogs = useSelector(state => state.blogs)

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null
  const userMatch = useRouteMatch('/users/:id')
  const userToShow = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null
  console.log('userToShow', userToShow)

  const dispatch = useDispatch()

  useEffect(() => {
    getUserLocalStorage()
  }, [])

  useEffect(() => {
    dispatch(setBlogs())
  }, [])

  useEffect(() => {
    dispatch(setUsers())
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

  const handleRemove = () => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    ) {
      removeBlog(blog)
    }
  }

  const removeBlog = async (blog) => {
    dispatch(setRemoveBlog(blog.id))
    dispatch(setNotification(`blog ${blog.title} by ${blog.author} was deleted`, 5))
    dispatch(setError(false))
  }

  const onUpdate = async () => {
    dispatch(setBlogs())
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
          <NavBar />
          <Switch>
            <Route path='/blogs/:id'>
              {blog
                ? <Blog
                  blog={blog}
                  user={user}
                  handleRemove={handleRemove}
                  onUpdate={onUpdate} />
                : <Redirect to='/blogs' />}
            </Route>
            <Route path='/blogs'>
              <BlogList blogs={blogs} user={user} />
            </Route>
            <Route path='/users/:id' >
              {userToShow
                ? <User user={userToShow} />
                : <Redirect to='/users' />}
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App