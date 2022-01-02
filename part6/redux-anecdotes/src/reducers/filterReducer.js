const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER': {
      return action.contentToFilter
    }
    default:
      return state
  }
}

export const filterSet = contentToFilter => {
  return {
    type: 'SET_FILTER',
    contentToFilter
  }
}

export default filterReducer