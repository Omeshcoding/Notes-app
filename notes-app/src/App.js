import { useState, useEffect, useRef } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notification';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import Togglable from './components/Toggleable';

const App = () => {
  const [notes, setNotes] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      </div>
    );
  };
  const noteForm = () => {};

  // Toggle importance
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        const note = notes.map((note) =>
          note.id !== id ? note : returnedNote
        );
        setNotes(note);
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  const logoutUser = () => window.localStorage.removeItem('loggedNoteappUser');
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);
  if (!notes) {
    return null;
  }
  // console.log();
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>{loginForm()}</div>
      <br />
      {user && (
        <div>
          <p>
            {user.name} logged in <button onClick={logoutUser}>logout</button>{' '}
          </p>
          {noteForm()}
        </div>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, index) => (
          <Note
            key={index}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
      <Footer />
    </div>
  );
};
export default App;
