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

  const preventUndefinedLikesValues = (blog) => {
    if (!blog.likes) {
      blog.likes = 0;
    }
  };

  const addBlog = async (blogObject) => {
    console.log({ blogObject });
    if (!blogObject.title || !blogObject.url) {
      setErrorMessage("Unable to create a new blog without title or url");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    try {
      const createdBlog = await blogService.create(
        blogObject
      );
      setBlogs(blogs.concat(createdBlog));
      blogFormRef.current.toggleVisibility();

      setMessage(`a new blog ${createdBlog.title} by ${createdBlog.author}`);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error(error.message);
      setErrorMessage("Unable to create blog a new blog");
    }
  };

  const onRender = async () => {
    try {
      const blogsRes = await blogService.getAll();
      blogsRes.map((blog) => preventUndefinedLikesValues(blog));
      const sortedByDecreasingLikes = blogsRes.sort((a, b) => {
        return b.likes - a.likes;
      });
      setBlogs(sortedByDecreasingLikes);
    } catch (error) {
      setErrorMessage("Unable to load blogs from server");
    }
  };

  useEffect(() => {
    onRender();
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
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}

      {blogs.length ? (
        <>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} setErrorMessage={setErrorMessage} />
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
