import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import { LoginForm } from "./components/LoginForm";
import { BlogForm } from "./components/BlogForm";
import blogService from "./services/blogs";
import Togglable from "./components/Toggable";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

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

  return (
    <div>
      {message && (
        <div>
          <p>{message}</p>
        </div>
      )}

      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}

      {!user && (
        <Togglable buttonLabel="Log In">
          <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
        </Togglable>
      )}

      {user && (
        <div>
          <p>{user.name} logged-in</p>
          <BlogForm
            setMessage={setMessage}
            setErrorMessage={setErrorMessage}
            setBlogs={setBlogs}
            blogs={blogs}
          />
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
