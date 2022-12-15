import { useState } from "react";
import Togglable from "./Toggable";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p> {blog.url}</p>
        <p> {blog.likes}</p>
      </div>
    </>
  );
};

export default Blog;
