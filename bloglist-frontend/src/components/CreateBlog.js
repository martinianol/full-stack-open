import React, { useState } from 'react'

const CreateBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    await props.createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create New Blog</h2>
      <div>Title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={handleTitle}
        />
      </div>
      <div>Author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthor}
        />
      </div>
      <div>URL:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={handleUrl}
        />
      </div>
      <button type="submit">Create</button>


    </form>
  )
}

export default CreateBlog