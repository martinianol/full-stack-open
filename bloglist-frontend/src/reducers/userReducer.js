import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'USER': {
      return action.data
    }
    case 'LOCAL_USER': {
      return action.data
    }
    default:
      return state
  }
}

export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'USER',
      data: user
    })
  }
}

export const getUserLocalStorage = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const loggedUser = JSON.parse(loggedUserJSON)
    blogService.setToken(loggedUser.token)

    return (dispatch => {
      dispatch({
        type: 'LOCAL_USER',
        data: loggedUser
      })
    })
  }

}

export default userReducer