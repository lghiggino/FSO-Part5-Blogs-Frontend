import { useState } from "react";

export const BlogForm = ({ createBlog }) => {
  const [newBlogData, setNewBlogData] = useState({
    title: "",
    url: "",
  });

  const addBlog = (event) => {
    event.preventDefault();
    console.log("entrou aqui >>>>>>>>>>>>>>.", newBlogData.title, newBlogData.url);
    createBlog({
      title: newBlogData.title,
      url: newBlogData.url,
    });

    setNewBlogData({
      title: "",
      url: "",
    });
  };

  return (
    <form onSubmit={addBlog}>
      <label>Title:</label>
      <input
        id={"blog-title"}
        value={newBlogData.title}
        onChange={({ target }) =>
          setNewBlogData({ ...newBlogData, title: target.value })
        }
      />
      <label>URL:</label>
      <input
        id={"blog-url"}
        value={newBlogData.url}
        onChange={({ target }) =>
          setNewBlogData({ ...newBlogData, url: target.value })
        }
      />
      <button type="submit">save</button>
    </form>
  );
};