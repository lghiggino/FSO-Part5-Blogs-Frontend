import { useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";

export const LoginForm = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user));

      blogService.setToken(user.token);
      blogService.setUserId(user.userId);
      blogService.setAuthor(user.username);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ marginBottom: 20 }}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};
