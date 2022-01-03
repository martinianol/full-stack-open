const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_VOTE_NOTIFICATION': {
      return action.notification
    }
    case 'SET_CREATE_NOTIFICATION': {
      return action.notification
    }
    default:
      return state
  }
}
export const voteNotification = anecdote => {
  const notification = `You have voted for '${anecdote.content}'`
  return {
    type: 'SET_VOTE_NOTIFICATION',
    notification,
  }
}
export const anecdoteNotification = content => {
  const notification = `You have created anecdote '${content}'`
  return {
    type: 'SET_CREATE_NOTIFICATION',
    notification,
  }
}

export const clearNotification = () => {
  const notification = null
  return {
    type: 'SET_CREATE_NOTIFICATION',
    notification
  }
}

export default notificationReducer