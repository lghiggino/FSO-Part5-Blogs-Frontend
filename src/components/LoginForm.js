export const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form>
    <label>Username</label>
    <input
      type="text"
      value={username}
      name="Username"
      onChange={setUsername}
    />
    <label>Password</label>
    <input
      type="password"
      value={password}
      name="Password"
      onChange={setPassword}
    />
    <button onPress={handleLogin}>login</button>
  </form>
);
