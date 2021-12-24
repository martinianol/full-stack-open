import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Message from './components/Message'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })();
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('loggedBlogeappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)


    } catch (exception) {
      setMessage('Wrong username or password')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }

  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }



  const addBlog = async (blogObject) => {

    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    blogFormRef.current.toggleVisibility()

    setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      {
        message !== null && <Message message={message} isError={error} />
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
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App