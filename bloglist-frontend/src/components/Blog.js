import React, { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const [viewHide, setViewHide] = useState('view')
  const [blogLikes, setBloglikes] = useState(blog.likes)

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
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleView}>{viewHide} details</button>
      {view && details()}
    </div>
  )
}

export default Blog