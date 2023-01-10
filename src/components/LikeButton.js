import {  PropTypes } from "prop-types";
function LikeButton({ blogId, addLike }) {
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
  addLike: PropTypes.func.isRequired,
};

export default LikeButton;
