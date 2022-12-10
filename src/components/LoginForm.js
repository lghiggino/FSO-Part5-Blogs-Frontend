const LoginForm = ({
  handleLogin,
  username,
  handleUserNameChange,
  password,
  handlePasswordChange,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <label>Username</label>
      <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUserNameChange}
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
      <button type="submit">login</button>
    </form>
  );
};
