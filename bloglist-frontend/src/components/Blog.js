import React, { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, user, onUpdate, removeBlog }) => {
  const [view, setView] = useState(false)
  const [viewHide, setViewHide] = useState('view')
  const [blogLikes, setBloglikes] = useState(blog.likes)

  const isUserBlog = () => {
    if (user.blogs.includes(blog.id)) {
      return (
        <button onClick={handleRemove}>Remove Blog</button>
      )
    }
  }

  const handleRemove = () => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    ) {
      removeBlog(blog.id)
    }
  }

  const handleView = () => {
    setView(!view)
    viewHide === 'view' ? setViewHide('hide') : setViewHide('view')
  }

  const addLike = async () => {

    let blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
      id: blog.id
    }
    setBloglikes(blogLikes + 1)
    onUpdate()
    await blogs.update(blogObject)
  }

  const details = () => {

    return (
      <div>
        <p>
          url: {blog.url}
        </p>
        <p>
          likes: {blogLikes} <button onClick={addLike}>like</button>
        </p>
        <p>
          user: {blog.user.username}
        </p>
        {isUserBlog()}
      </div>
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={handleView}>{viewHide} details</button>
      {view && details()}

    </div>
  )
}

export default Blog