import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'


import { setNotification } from './reducers/notificationReducer'
import { setError } from './reducers/errorReducer'
import { setUser, getUserLocalStorage } from './reducers/userReducer'


import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import Message from './components/Message'
import Blogs from './components/Blogs'
import Users from './components/Users'

const App = () => {
  const notification = useSelector(state => state.notification)
  const error = useSelector(state => state.error)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

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


  return (
    <Router>
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
          <Switch>
            <Route path='/blogs'>
              <Blogs />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>

          </Switch>
        </div>
      }
    </Router>
  )
}

export default App