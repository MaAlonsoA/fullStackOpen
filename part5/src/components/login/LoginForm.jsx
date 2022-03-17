import PropTypes from 'prop-types';

function LoginForm({
  handleSubmit,
  username,
  setUsername,
  setPassword,
  password,
}) {
  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          name="Username"
          placeholder="Username"
          onChange={setUsername}
        />
        <input
          type="password"
          value={password}
          name="Password"
          placeholder="Password"
          onChange={setPassword}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
