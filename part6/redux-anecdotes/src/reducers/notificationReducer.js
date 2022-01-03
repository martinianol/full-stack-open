const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return action.notification
    }
    default:
      return state
  }
}

export const clearNotification = () => {
  const notification = null
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const setNotification = (content) => {
  const notification = content
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const setNotificationWithTimeout = (text, time) => {
  console.log(time * 1000)
  return function (dispatch) {
    dispatch(setNotification(text))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationReducer