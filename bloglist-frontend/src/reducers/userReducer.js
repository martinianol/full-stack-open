const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'USER': {
      return action.data
    }
    default:
      return state
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'USER',
      data: user
    })
  }
}

export default userReducer