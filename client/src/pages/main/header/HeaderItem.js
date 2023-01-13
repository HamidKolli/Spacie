import React from "react";

const HeaderItem = (props) => {
  return (
    <span onClick={() => props.onClick()}>
      <img src={props.image} alt={props.nom} title={props.nom} />
    </span>
  );
};

export default HeaderItem;
