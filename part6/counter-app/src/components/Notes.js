import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import Note from './Note'
import noteService from '../service/notes'

const Notes = () => {
  const notes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.notes
    }
    return state.filter === 'IMPORTANT'
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important)
  })

  const dispatch = useDispatch()

  const toggleImportance = async (id) => {
    dispatch(toggleImportanceOf(id))
    await noteService.toggleImportance(id)
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