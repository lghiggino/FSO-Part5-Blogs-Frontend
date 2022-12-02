import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [newBlogData, setNewBlogData] = useState({
    title: "",
    url: "",
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      blogService.setUserId(user.userId);
      blogService.setAuthor(user.username);
    }
  }, []);

  const addBlog = (event) => {
    event.preventDefault();

    if (!newBlogData.title || !newBlogData.url) {
      setErrorMessage("Unable to create a new blog without title or url");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    blogService.create(newBlogData);

    window.location.reload();
  };

  const handleLogin = async (event) => {
    event.preventDefault();

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
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
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

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <label>Title:</label>
      <input
        value={newBlogData.title}
        onChange={({ target }) =>
          setNewBlogData({ ...newBlogData, title: target.value })
        }
      />
      <label>URL:</label>
      <input
        value={newBlogData.url}
        onChange={({ target }) =>
          setNewBlogData({ ...newBlogData, url: target.value })
        }
      />
      <button type="submit">save</button>
    </form>
  );

  return (
    <div>
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          {blogForm()}
        </div>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
