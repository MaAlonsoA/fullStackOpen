import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Toggable({ children, buttonLabel }) {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={() => setVisible(true)}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <button type="button" onClick={() => setVisible(false)}>cancel</button>
        {children}
      </div>
    </div>

  );
}

Toggable.propTypes = {
  children: PropTypes.element.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};
