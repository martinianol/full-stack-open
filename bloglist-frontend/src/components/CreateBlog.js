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

    if (title === '' || author === '' || url === '') {
      console.log('data missing')
      return
    }

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
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={handleTitle}
        />
      </div>
      <div>Author:
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthor}
        />
      </div>
      <div>URL:
        <input
          id="url"
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