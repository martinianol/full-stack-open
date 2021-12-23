const CreateBlog = (props) => (
  <form onSubmit={props.onSubmit}>
    <h2>Create New Blog</h2>
    <div>Title:
      <input
        type="text"
        value={props.title}
        name="Title"
        onChange={({ target }) => props.setTitle(target.value)}
      />
    </div>
    <div>Author:
      <input
        type="text"
        value={props.author}
        name="Author"
        onChange={({ target }) => props.setAuthor(target.value)}
      />
    </div>
    <div>URL:
      <input
        type="text"
        value={props.url}
        name="Url"
        onChange={({ target }) => props.setUrl(target.value)}
      />
    </div>
    <button type="submit">Create</button>


  </form>
)

export default CreateBlog