/* eslint-disable react/display-name */
import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef(
  ({ buttonLabel, closeButtonLabel = "cancel", children }, refs) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => {
      setVisible(!visible);
    };

    useImperativeHandle(refs, () => {
      return {
        toggleVisibility,
      };
    });

    return (
      <div>
        <div style={hideWhenVisible}>
          <button
            onClick={toggleVisibility}
            style={{ textTransform: "capitalize" }}
          >
            {buttonLabel}
          </button>
        </div>
        <div style={showWhenVisible}>
          {children}
          <button onClick={toggleVisibility}>
            {closeButtonLabel || "cancel"}
          </button>
        </div>
      </div>
    );
  }
);

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
