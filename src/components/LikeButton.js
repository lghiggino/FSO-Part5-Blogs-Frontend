import { PropTypes } from "prop-types";
import blogService from "../services/blogs";

function LikeButton({ blogId, setLocalLikes, setErrorMessage }) {
  const addLike = async (id) => {
    try {
      const res = await blogService.addLike(id);
      setLocalLikes(res.likes);
    } catch (error) {
      setErrorMessage("Unable to update likes at this moment");
    }
  };

  return (
    <button
      id="like-button"
      onClick={() => addLike(blogId)}
      style={{ textTransform: "capitalize" }}
    >
      Like this
    </button>
  );
}

LikeButton.propTypes = {
  blogId: PropTypes.string.isRequired,
  setLocalLikes: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default LikeButton;
