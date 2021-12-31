import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import Note from './Note'

const Notes = () => {
  const notes = useSelector(state => state)
  const dispatch = useDispatch()

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  return (
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          handleClick={() => toggleImportance(note.id)}
          note={note} />
      )}
    </ul>
  )
}

export default Notes