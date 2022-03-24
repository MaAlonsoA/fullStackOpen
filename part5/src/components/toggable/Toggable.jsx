import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Toggable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => setVisible(!visible);
  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={() => toggleVisibility()}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button type="button" onClick={() => toggleVisibility()}>cancel</button>
      </div>
    </div>
  );
});

Toggable.displayName = 'Toggable';
Toggable.propTypes = {
  children: PropTypes.element.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggable;
