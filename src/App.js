import { useState, useEffect, useRef } from "react";
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

  const blogFormRef = useRef();

  return (
    <div style={{ maxWidth: "600px" }}>
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
          <Togglable buttonLabel="create new blog post" ref={blogFormRef}>
            <BlogForm
              setMessage={setMessage}
              setErrorMessage={setErrorMessage}
              setBlogs={setBlogs}
              blogs={blogs}
              blogFormRef={blogFormRef}
            />
          </Togglable>
        </div>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} setErrorMessage={setErrorMessage} />
      ))}
    </div>
  );
};

export default App;
