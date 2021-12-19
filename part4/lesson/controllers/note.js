const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    const note = await Note.findById(id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }

  } catch (exception) {
    next(exception)
  }

})

notesRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    await Note.findByIdAndRemove(id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }

})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  try {
    const savedNote = await note.save()
    response.json(savedNote)
  } catch (exception) {
    next(exception)
  }


})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const id = request.params.id

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})


module.exports = notesRouter