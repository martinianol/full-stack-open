import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'

const NavBar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(setUser(null))
  }

  const padding = {
    padding: 5
  }

  const navigationBar = {
    padding: 5,
    display: 'flex',
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }

  return (
    <div style={navigationBar}>
      <Link to="/" style={padding}>home</Link>
      <Link to="/blogs" style={padding}>blogs</Link>
      <Link to="/users" style={padding}>users</Link>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default NavBar