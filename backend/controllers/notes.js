const notesRouter = require('express').Router();

const Note = require('../models/note');

// Get all notes
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});
// Get single note
notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

// Post
notesRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  try {
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (exception) {
    next(exception);
  }
});
// Delete
notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id);

    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});
// Update
notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body;

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
