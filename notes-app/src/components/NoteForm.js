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
      important: Math.random() > 0.5,
    });
    setNewNote('');
  };

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          placeholder="write note content here"
          id="note-input"
        />
        <input type="text" placeholder="This is a testing placeholder" />
        <button type="submit"> save</button>
      </form>
    </div>
  );
};
export default NoteForm;
