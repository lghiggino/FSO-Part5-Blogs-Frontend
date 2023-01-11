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

  const [newBlogData, setNewBlogData] = useState({
    title: "",
    url: "",
  });

  const preventUndefinedLikesValues = (blog) => {
    if (!blog.likes) {
      blog.likes = 0;
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

    blogFormRef.current.toggleVisibility();

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
              addBlog={addBlog}
              newBlogData={newBlogData}
              setNewBlogData={setNewBlogData}
            />
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
