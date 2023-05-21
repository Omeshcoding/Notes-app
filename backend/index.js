require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const Note = require('./models/note');

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  console.log('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// Error Handling
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'castError') {
    return response.status(400).send({ error: 'malformatting id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static('build'));

// Get all notes
app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});
// Get single note
app.get('/api/notes/:id', (error, request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});
// Delete
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});
// Update
app.put('/api/notes/:id', (request, response, next) => {
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

// Post
app.post('/api/notes', (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
