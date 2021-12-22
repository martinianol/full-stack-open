const NoteForm = (props) => (
  <form onSubmit={() => props.onSubmit}>
    <input
      value={props.newNote}
      onChange={props.handleNoteChange}
    />
    <button type="submit">save</button>
  </form>
)

export default NoteForm