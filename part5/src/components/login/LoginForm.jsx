import { useState } from 'react';
import PropTypes from 'prop-types';
import Toggable from '../toggable/Toggable';

function LoginForm({ login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ username, password });
    setUsername('');
    setPassword('');
  };
  return (
    <Toggable buttonLabel="Login">
      <form autoComplete="off" onSubmit={handleSubmit}>
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

export default LoginForm;
