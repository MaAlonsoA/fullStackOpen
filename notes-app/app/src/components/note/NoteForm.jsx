import { useState } from 'react';
import PropTypes from 'prop-types';

export default function NoteForm({ addNote }) {
  const [newNote, setNewNote] = useState('');

  const handleChange = ({ target }) => {
    setNewNote(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    addNote(noteObject);
    setNewNote('');
  };
  return (
    <div>
      <h3>Create a new note</h3>
      <form onSubmit={handleSubmit}>
        <input value={newNote} placeholder="New note" onChange={handleChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
}

NoteForm.propTypes = {
  addNote: PropTypes.func.isRequired,
};
