export const BlogForm = ({ addBlog, newBlogData, setNewBlogData }) => {
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
