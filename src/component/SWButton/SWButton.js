import React from "react";
import "./SWButton.css";
const SWButton = props => {
  return (
    <button className="swbtn" {...props}>
      <i className="fa fa-star"></i> {props.children}{" "}
      <i className="fa fa-star"></i>
    </button>
  );
};
export default SWButton;
