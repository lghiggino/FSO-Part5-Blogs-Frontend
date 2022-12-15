import { useState } from "react";
import Togglable from "./Toggable";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
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
      </div>
      <div style={{ display: !visible ? "none" : "" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p> url: {blog.url}</p>
          <p> likes: {blog.likes}</p>
        </div>
      </div>
    </>
  );
};

export default Blog;
