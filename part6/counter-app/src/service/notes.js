import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const getById = async (id) => {
  const notes = await axios.get(baseUrl)
  const note = notes.find(note => note.data.id === id)
  return note.data
}

const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const toggleImportance = async (id) => {
  const response = await axios.get(baseUrl)
  const notes = response.data
  const note = notes.find(note => note.id === id)

  const noteChanged = {
    ...note, important: !note.important
  }
  const responseUpdate = await axios.put(`${baseUrl}/${id}`, noteChanged)

  return responseUpdate
}


export default { getAll, createNew, toggleImportance }