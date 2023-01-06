import { useState } from "react";
import blogService from "../services/blogs";

export const BlogForm = ({ setMessage, setErrorMessage, setBlogs, blogs, blogFormRef }) => {
  const [newBlogData, setNewBlogData] = useState({
    title: "",
    url: "",
  });

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
};
