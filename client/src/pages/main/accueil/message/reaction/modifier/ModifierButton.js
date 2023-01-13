import React from "react";
import ModifierPage from "./ModifierPage";

let clicked = false;
const ModifierButton = (props) => {
  return (
    <div
      className="message_button fa-solid fa-pen-to-square fa-xl"
      onClick={(event) => {
        clicked
          ? props.setReaction(<ModifierPage message={props.message} />)
          : props.setReaction(null);
        clicked = !clicked;
      }}
    ></div>
  );
};

export default ModifierButton;
