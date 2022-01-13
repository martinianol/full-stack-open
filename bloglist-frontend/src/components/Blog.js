import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { Redirect } from 'react-router-dom'
import CreateComment from './CreateComment'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { setError } from '../reducers/errorReducer'
import { setBlogs } from '../reducers/blogsReducer'


const Blog = ({ blog, user, handleRemove, onUpdate }) => {

  const [blogLikes, setBloglikes] = useState(blog.likes)


  const [blogComments, setBlogComments] = useState(blog.comments)

  /*  useEffect(() => { areComments() }, [blogComments]) */


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

  const addComment = (commentObject) => {
    console.log('blog Comments 1', blogComments)
    /*  const returnedComment = await blogService.create(commentObject) */

    /* dispatch(createComment(returnedComment)) */
    setBlogComments(blogComments.concat(commentObject))
    console.log('blog Comments after concat', blogComments)

    blog.comments = blogComments


    /*     dispatch(setBlogs) */
    /* user.blogs.comments = user.blogs.concat(commentObject)
  */
    /* dispatch(setUser(user))
    dispatch(setNotification(`a new comment ${returnedComment.content} added`, 5))
    dispatch(setError(false)) */
  }

  const areComments = () => {
    console.log('Blog Comments inside AreComments', blog.comments)
    /*  console.log(blog.comments[0]._id) */
    if (blog.comments) {
      return (
        <div>
          <h3>Comments</h3>
          <ul>
            {blog.comments.map(comment => {
              return (
                <li key={comment._id}>{comment.content}</li>
              )
            })}
          </ul>
        </div>
      )
    } else {
      return null
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
            <CreateComment createComment={addComment} />
            {areComments()}
            {isUserBlog()}
          </div>
        </div>
      }
    </>
  )
}

export default Blog