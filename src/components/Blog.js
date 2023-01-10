import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import { PropTypes } from "prop-types";
import LikeButton from "./LikeButton";

const Blog = ({ blog, setErrorMessage }) => {
  const [visible, setVisible] = useState(false);
  const [localLikes, setLocalLikes] = useState(0);
  const [localUser, setLocalUser] = useState("");

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

  const deleteBlog = async (blog) => {
    try {
      const captureConfirm = window.confirm(
        `Remove blog "${blog.title}" by ${blog.author}`
      );
      if (captureConfirm === true) {
        await blogService.remove(blog.id);
        window.location.reload();
      } else return;
    } catch (error) {
      setErrorMessage("Unable to delete Blog at this moment");
    }
  };

  useEffect(() => {
    setLocalLikes(blog.likes);
  }, [blog]);

  useEffect(() => {
    if (!localStorage.getItem("loggedInBlogUser")) {
      return;
    }
    const storageUser = JSON.parse(localStorage.getItem("loggedInBlogUser"));
    setLocalUser(storageUser.username);
  }, []);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
        }}
      >
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <button
          onClick={toggleVisibility}
          style={{ textTransform: "capitalize" }}
        >
          View
        </button>
        <LikeButton
          blogId={blog.id}
          setLocalLikes={setLocalLikes}
          setErrorMessage={setErrorMessage}
          addLike={addLike}
        />
        {blog.author === localUser && (
          <button
            onClick={() => deleteBlog(blog)}
            style={{ textTransform: "capitalize" }}
          >
            Delete this
          </button>
        )}
      </div>
      <div style={{ display: !visible ? "none" : "" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p className={"blogUrl"}> url: {blog.url}</p>
          <p id={"blog-likes"}> likes: {localLikes}</p>
        </div>
      </div>
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default Blog;
