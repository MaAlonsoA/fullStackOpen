import { useState } from 'react';
import PropTypes from 'prop-types';

import Toggable from '../toggable/Toggable';

export default function LoginForm({
  login,
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ username, password });
    setUsername('');
    setPassword('');
  };
  return (
    <Toggable buttonLabel="login">
      <form onSubmit={handleSubmit} autoComplete="off">
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
    </Toggable>

  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};
