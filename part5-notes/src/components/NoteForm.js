const NoteForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <h3>New note</h3>
    <input
      value={props.newNote}
      onChange={props.handleNoteChange}
    />
    <button type="submit">save</button>
  </form>
)

export default NoteForm