import React from 'react';
import PropTypes from 'prop-types';
const Note = ({ note, toggleImportance }) => {
  Note.propTypes = {
    note: PropTypes.object.isRequired,
    toggleImportance: PropTypes.func.isRequired,
  };

  const label = note.important ? 'make not important' : 'make important';
  return (
    <>
      <li className="note">
        <span> {note.content}</span>
        <button onClick={toggleImportance}>{label} </button>
      </li>
    </>
  );
};

export default Note;
