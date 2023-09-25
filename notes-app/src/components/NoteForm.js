import React, { useState } from 'react';
import PropTypes from 'prop-types';
const NoteForm = ({ createNote }) => {
  NoteForm.propTypes = {
    createNote: PropTypes.func.isRequired,
  };

  const [newNote, setNewNote] = useState('');

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: true,
    });
    setNewNote('');
  };

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit"> save</button>
      </form>
    </div>
  );
};
export default NoteForm;
