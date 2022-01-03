import { useSelector, useDispatch } from "react-redux"
import { voteId } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

import Notification from "./Notification"


const AnecdoteList = () => {
  let anecdotes = useSelector(state => state.anecdotes)
  const contentToFilter = useSelector(state => state.filter)

  anecdotes = anecdotes.filter(anecdote => anecdote.content.includes(contentToFilter))

  const dispatch = useDispatch()
  const vote = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(voteId(id))
    const notification = `you voted '${anecdote.content}'`
    dispatch(setNotification(notification, 5))

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