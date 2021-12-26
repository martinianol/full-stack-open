import React, { useState } from 'react'

const NoteForm = (props) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    props.createNote({
      content: newNote,
      date: new Date().toISOString(),
      important: true,
    })
    setNewNote('')
  }

  return (
    <div className='formDiv'>
      <h3>New note</h3>

      <form onSubmit={addNote}>
        <input
          id="newNote"
          value={newNote}
          onChange={handleChange}
        />
        <button id="save-new-note" type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm