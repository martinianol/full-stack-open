const errorReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_TRUE': {
      return true
    }
    case 'SET_FALSE': {
      return false
    }
    default:
      return state
  }
}

export const setError = (error) => {
  if (error) {
    return {
      type: 'SET_TRUE'
    }
  } else {
    return {
      type: 'SET_FALSE'
    }
  }
}

export default errorReducer