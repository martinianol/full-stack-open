import React, { useState } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setError } from '../reducers/errorReducer'
import { setRemoveBlog, setBlogs } from '../reducers/blogsReducer'

const BlogList = ({ user }) => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const onUpdate = async () => {
    dispatch(setBlogs())
  }

  const removeBlog = async (id) => {
    const blogToDelete = await blogService.getOne(id)
    dispatch(setRemoveBlog(id))
    dispatch(setNotification(`blog ${blogToDelete.title} by ${blogToDelete.author} was deleted`, 5))
    dispatch(setError(false))
  }

  return (
    <div>
      <h2>blogs</h2>
      {
        blogs.map(blog =>
          <Blog
            id={blog.id}
            key={blog.id}
            blog={blog} user={user}
            onUpdate={onUpdate}
            removeBlog={removeBlog} />
        )
      }
    </div>
  )
}

export default BlogList