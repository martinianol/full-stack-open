import { useSelector, useDispatch } from "react-redux"
import { voteId } from "../reducers/anecdoteReducer"
import { voteNotification, clearNotification } from "../reducers/notificationReducer"

import Notification from "./Notification"


const AnecdoteList = () => {
  let anecdotes = useSelector(state => state.anecdotes)
  const contentToFilter = useSelector(state => state.filter)

  anecdotes = anecdotes.filter(anecdote => anecdote.content.includes(contentToFilter))

  const dispatch = useDispatch()
  const vote = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(voteId(id))
    dispatch(voteNotification(anecdote)); setTimeout(() => {
      dispatch(clearNotification())
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