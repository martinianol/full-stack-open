import React, { useState, useRef, useEffect } from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setError } from '../reducers/errorReducer'
import { setRemoveBlog, setBlogs, initializeBlogs, createBlog } from '../reducers/blogsReducer'
import { setUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

import Togglable from './Togglable'
import CreateBlog from './CreateBlog'

const BlogList = ({ blogs, user }) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    (async () => {
      dispatch(setBlogs())
    })
  }, [user])

  const addBlog = async (blogObject) => {

    const returnedBlog = await blogService.create(blogObject)

    dispatch(createBlog(returnedBlog))
    blogFormRef.current.toggleVisibility()
    user.blogs = user.blogs.concat(returnedBlog.id)
    dispatch(setUser(user))
    dispatch(setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 5))
    dispatch(setError(false))
  }

  const styleLink = {
    display: 'block'
  }

  return (
    <div>
      <Togglable
        buttonLabel='Create new blog'
        ref={blogFormRef}>
        <CreateBlog
          createBlog={addBlog}
        />
      </Togglable>
      <h2>blogs</h2>
      {
        blogs.map(blog => {
          return (
            <Link to={`/blogs/${blog.id}`} key={blog.id} style={styleLink}>{blog.title} </Link>
          )
        })
      }
    </div >
  )
}

export default BlogList