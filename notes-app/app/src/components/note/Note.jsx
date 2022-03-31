import PropTypes from 'prop-types';

function Note({ note, toggleImportance }) {
  const label = note.important ? 'make not important' : '';
  return (
    <div>
      {' '}
      <li className="note">
        { note.content }
      </li>
      <input type="checkbox" data-testid="checkBox" onChange={toggleImportance} checked={note.important} />
      {label}
    </div>

  );
}

Note.propTypes = {
  note: PropTypes.shape().isRequired,
  toggleImportance: PropTypes.func.isRequired,
};
export default Note;
