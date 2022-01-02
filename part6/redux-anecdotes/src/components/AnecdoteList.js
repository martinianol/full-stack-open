import { useSelector, useDispatch } from "react-redux"
import { voteId } from "../reducers/anecdoteReducer"
import { voteNotification } from "../reducers/notificationReducer"

import Notification from "./Notification"


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  const vote = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(voteId(id))
    dispatch(voteNotification(anecdote)); setTimeout(() => {
      dispatch(voteNotification(null))
    }, 5000)
  }

  return (
    <div>
      <Notification />
      {
        anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList