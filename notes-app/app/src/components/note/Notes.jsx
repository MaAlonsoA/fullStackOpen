import { useState } from 'react';
import PropTypes from 'prop-types';

import Note from './Note';

export default function Notes({ notes, toggleImportance }) {
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  return (
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
  );
}

Notes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  toggleImportance: PropTypes.func.isRequired,
};
