import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import { LoginForm } from "./components/LoginForm";
import blogService from "./services/blogs";
import Togglable from "./components/Toggable";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

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

  const addBlog = async (event) => {
    event.preventDefault();

    if (!newBlogData.title || !newBlogData.url) {
      setErrorMessage("Unable to create a new blog without title or url");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    const createdBlog = await blogService.create(newBlogData);

    console.log(createdBlog);

    setMessage(`a new blog ${createdBlog.title} by ${createdBlog.author}`);

    setTimeout(() => {
      setMessage("");
    }, 3000);

    const newBlogList = blogs.concat({
      title: createdBlog.title,
      author: createdBlog.author,
      id: createdBlog.id,
    });

    setBlogs(newBlogList);
  };

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
