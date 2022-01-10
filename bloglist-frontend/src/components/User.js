import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  console.log(user)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map(blog => {
          return (
            <Link to={`/blogs/${blog.id}`} key={blog.id}>
              <li>{blog.title}</li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default User