import { useEffect, useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setErrorMessage }) => {
  const [visible, setVisible] = useState(false);
  const [localLikes, setLocalLikes] = useState(0);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addLike = async (id) => {
    try {
      const res = await blogService.addLike(id);
      setLocalLikes(res.likes);
    } catch (error) {
      setErrorMessage("Unable to update likes at this moment");
    }
  };

  useEffect(() => {
    setLocalLikes(blog.likes);
  }, [blog]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr 1fr",
        }}
      >
        <p>
          {blog.title} {blog.author}
        </p>
        <button
          onClick={toggleVisibility}
          style={{ textTransform: "capitalize" }}
        >
          View
        </button>
        <button
          onClick={() => addLike(blog.id)}
          style={{ textTransform: "capitalize" }}
        >
          Like this
        </button>
      </div>
      <div style={{ display: !visible ? "none" : "" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p> url: {blog.url}</p>
          <p> likes: {localLikes}</p>
        </div>
      </div>
    </>
  );
};

export default Blog;
