import axios from "axios";
import React from "react";
import { getLoginFromToken, getToken } from "./token";

const SupprimerAmiButton = (props) => {
  return (
    <div
      className="buttons"
      onClick={() => {
        axios.delete("/api/friend/" + props.login,
        {login : getLoginFromToken(),headers: {
          authorization: "Bearer " + getToken(),
        },}
        ).then(() => props.refresh()).catch((err) => alert(err));
      }}
    >
      Bloquer
    </div>
  );
};

export default SupprimerAmiButton;
