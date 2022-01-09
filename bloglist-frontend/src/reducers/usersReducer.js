import userService from '../services/users'

const usersReducer = (state = null, action) => {
  switch (action.type) {
    case 'USERS': {
      return action.data
    }
    default:
      return state
  }
}

export const setUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'USERS',
      data: users
    })
  }
}


export default usersReducer