import blogService from '../services/blogs'
import _ from 'lodash'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS': {
      return action.data
    }
    case 'SET_BLOGS': {
      return action.data
    }
    case 'NEW_BLOG': {
      return state.concat(action.data)
    }
    case 'LIKE': {
      const id = action.data.id
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog)
    }
    case 'REMOVE_BLOG': {
      const id = action.data.id
      const updatedBlogs = _.filter(state, blog => blog.id !== id)
      return updatedBlogs

    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    console.log('initializeBlogs', blogs)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const setBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch({
      type: 'SET_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeId = (id) => {
  return async dipatch => {
    dispatch({
      type: 'LIKE',
      data: { id }
    })
    await blogService.update(id)
  }
}

export const setRemoveBlog = (id) => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
    await blogService.destroy(id)
  }
}

export default blogReducer