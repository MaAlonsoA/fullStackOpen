import React, { useState, useEffect } from 'react';

import Note from './components/note/Note';
import Notification from './components/notification/Notification';
import {
  getAllNotes, postNote, putNote, setToken,
} from './Services/noteService';
import login from './Services/loginService';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState({ type: '', message: '' });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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

  useEffect(async () => {
    const serverNotes = await getAllNotes();
    setNotes(serverNotes);
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      setToken(loggedUser.token);
    }
  }, []);

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

  const addNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    try {
      const response = await postNote(noteObject);
      setNotes((prevNotes) => prevNotes.concat(response));
      setNewNote('');
    } catch (error) {
      messageHandler('error', error.message, 5000);
    }
  };

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedUser = await login({ username, password });

      setUser(loggedUser);
      setToken(loggedUser.token);

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(loggedUser));
      setUsername('');
      setPassword('');
      messageHandler('success', 'Correct login');
    } catch (error) {
      messageHandler('error', 'invalid user or password', 5000);
    }
  };

  const renderLoginForm = () => (
    <div>
      <form onSubmit={handleLogin} autoComplete="off">
        <input
          type="text"
          value={username}
          name="Username"
          placeholder="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          type="password"
          value={password}
          name="Password"
          placeholder="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
  const renderNewNoteForm = () => (
    <div>
      <form onSubmit={addNote}>
        <input value={newNote} placeholder="New note" onChange={handleChange} />
        <button type="submit">save</button>
      </form>
      <div><button type="button" onClick={handleLogout}>Logout</button></div>

    </div>
  );
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  return (
    <div>

      <div>
        { !notification.type ? null : (
          <Notification type={notification.type} message={notification.message} />
        )}
      </div>
      {user === null && renderLoginForm()}
      <div>
        <h1>Notes</h1>
        <div>
          <button type="button" onClick={() => setShowAll(!showAll)}>
            show
            {showAll ? ' important' : ' all' }
          </button>
        </div>
        <ul>
          {notesToShow.map((note) => (
            <Note key={note.id} toggleImportance={() => toggleImportance(note.id)} note={note} />
          ))}
        </ul>
      </div>
      {user !== null && renderNewNoteForm()}
    </div>
  );
}

export default App;
