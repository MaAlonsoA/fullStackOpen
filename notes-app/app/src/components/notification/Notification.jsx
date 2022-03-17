import PropTypes from 'prop-types';

function Notification({ type, message }) {
  return (
    <div>
      <p className={type}>{message}</p>
    </div>
  );
}

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Notification;
