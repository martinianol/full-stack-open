import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const [viewHide, setViewHide] = useState('view')

  const handleView = () => {
    setView(!view)
    viewHide === 'view' ? setViewHide('hide') : setViewHide('view')
  }

  const details = () => {
    return (
      <div>
        <p>
          url: {blog.url}
        </p>
        <p>
          likes: {blog.likes} <button>like</button>
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