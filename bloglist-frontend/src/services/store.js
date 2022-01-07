import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from '../reducers/notificationReducer'
import errorReducer from '../reducers/errorReducer'
import userReducer from '../reducers/userReducer'
import blogReducer from '../reducers/blogsReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  error: errorReducer,
  user: userReducer
})

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)