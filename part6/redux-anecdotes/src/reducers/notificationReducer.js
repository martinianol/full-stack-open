const notificationReducer = (state = `I'm the notification`, action) => {
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
  if (anecdote === null) {
    const notification = null
    return {
      type: 'SET_VOTE_NOTIFICATION',
      notification,
    }
  }
  const notification = `You have voted for '${anecdote.content}'`
  return {
    type: 'SET_VOTE_NOTIFICATION',
    notification,
  }
}
export const anecdoteNotification = content => {
  if (content === null) {
    const notification = null
    return {
      type: 'SET_CREATE_NOTIFICATION',
      notification,
    }
  }
  const notification = `You have created anecdote '${content}'`
  return {
    type: 'SET_CREATE_NOTIFICATION',
    notification,
  }
}

export default notificationReducer