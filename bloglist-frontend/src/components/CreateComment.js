import React, { useState } from 'react'

const CreateComment = (props) => {
  const [content, setContent] = useState('')

  const handleContent = (event) => {
    setContent(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()

    if (content === '') {
      console.log('data missing')
      return
    }

    const commentObject = {
      content,
      _id: '_' + Math.random().toString(36).substr(2, 9)
    }

    props.createComment(commentObject)
    setContent('')
  }

  return (
    <form onSubmit={addComment}>
      <h4>Create New Comment</h4>
      <div>Comment:
        <input
          id="comment"
          type="text"
          value={content}
          name="content"
          onChange={handleContent}
        />
      </div>
      <button id="button-create-blog" type="submit">Create</button>


    </form>
  )
}

export default CreateComment