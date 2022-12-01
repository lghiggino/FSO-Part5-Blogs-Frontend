const LoginForm = () => {
  return (
    <form onSubmit={handleLogin}>
      <label>Username</label>
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <button type="submit">login</button>
    </form>
  );
};
