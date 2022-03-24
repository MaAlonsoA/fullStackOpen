import { useState, useRef, useEffect } from 'react';

import Notification from './components/notification/Notification';
import {
  getAllNotes, postNote, putNote, setToken,
} from './Services/noteService';
import login from './Services/loginService';
import LoginForm from './components/loginForm/LoginForm';
import NoteForm from './components/note/NoteForm';
import Notes from './components/note/Notes';
import Toggable from './components/toggable/Toggable';

function App() {
  const [notes, setNotes] = useState([]);

  const [notification, setNotification] = useState({ type: '', message: '' });
  const [user, setUser] = useState(null);

  const toggableRef = useRef();

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      setToken(loggedUser.token);
      setNotes(await getAllNotes());
    }
  }, []);

  const messageHandler = (type, message, time = 3000) => {
    setNotification({
      type,
      message,
    });
    setTimeout(() => {
      setNotification({
        type: '',
        message: '',
      });
    }, time);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem('loggedNoteAppUser');
  };

  const toggleImportance = async (id) => {
    const noteToUpdate = notes.find((note) => note.id === id);
    try {
      const updatedNote = await putNote({ ...noteToUpdate, important: !noteToUpdate.important });
      setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)));
      messageHandler('success', 'note updated');
    } catch (error) {
      messageHandler('error', error.message, 5000);
    }
  };

  const addNote = async (noteObject) => {
    toggableRef.current.toggleVisibility();
    try {
      await postNote(noteObject);
      setNotes(await getAllNotes());
      messageHandler('success', 'Note added');
    } catch (error) {
      messageHandler('error', error.message, 5000);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await login(credentials);
      setUser(loggedUser);
      setToken(loggedUser.token);
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(loggedUser));
      messageHandler('success', 'Correct login');
      setNotes(await getAllNotes());
    } catch (error) {
      messageHandler('error', 'invalid user or password', 5000);
    }
  };

  return (
    <div>
      { !notification.type ? null : (
        <Notification type={notification.type} message={notification.message} />
      )}
      {user === null
        ? <LoginForm login={handleLogin} />
        : <button type="button" onClick={handleLogout}>Logout</button>}

      {user !== null && (
        <div>
          <Notes
            notes={notes}
            toggleImportance={toggleImportance}
          />
          <Toggable buttonLabel="New Note" ref={toggableRef}>
            <NoteForm
              addNote={addNote}
            />
          </Toggable>
        </div>
      )}
    </div>
  );
}

export default App;
