import React, { useState } from 'react'
import blogService from '../services/blogs'
import { Redirect } from 'react-router-dom'

const Blog = ({ blog, user, handleRemove, onUpdate }) => {

  const [blogLikes, setBloglikes] = useState(blog.likes)

  const addLike = async () => {
    let blogObject = {
      ...blog,
      likes: blog.likes + 1,
    }
    setBloglikes(blogLikes + 1)
    await blogService.update(blogObject)
    await onUpdate()
  }

  const isUserBlog = () => {
    if (user.blogs.includes(blog.id)) {
      return (
        <button onClick={handleRemove}>Remove Blog</button>
      )
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <>
      {!blog
        ? <Redirect to='/blogs' />
        :
        <div style={blogStyle} className='blog'>
          <h2>Blog</h2>
          {blog.title} {blog.author}
          <div className='details'>
            <p>
              url: {blog.url}
            </p>
            <p id='likes'>
              likes: {blogLikes} <button onClick={addLike}>like</button>
            </p>
            <p>
              user: {blog.user.username}
            </p>
            {isUserBlog()}
          </div>
        </div>
      }
    </>
  )
}

export default Blog