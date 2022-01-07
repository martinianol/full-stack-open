import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import BlogList from './BlogList'

import { setUser } from '../reducers/userReducer'
import { initializeBlogs, createBlog, setBlogs } from '../reducers/blogsReducer'


const Blogs = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    (async () => {
      dispatch(setBlogs())
    })()
  }, [user])

  const addBlog = async (blogObject) => {

    const returnedBlog = await blogService.create(blogObject)
    dispatch(createBlog(returnedBlog))
    blogFormRef.current.toggleVisibility()
    user.blogs = user.blogs.concat(returnedBlog.id)
    dispatch(setUser(user))
    dispatch(setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 5))
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
      <BlogList user={user} />
    </div>
  )
}

export default Blogs