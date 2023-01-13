import axios from "axios";
import React from "react";
import { getLoginFromToken } from "../../../general/token";
import Accueil from "../../Accueil";
import { getToken } from "../../../general/token";
const SupprimerButton = (props) => {
  return (
    <div
      className="message_button fa-solid fa-trash-can fa-xl"
      onClick={(event) => {
        axios
          
          .delete("/api/message/" + props.messageID,{login : getLoginFromToken(),headers: {
            authorization: "Bearer " + getToken(),
          }}
          )
          .then((res) => {
            props.setPage(
              <Accueil
                setPage={props.setPage}
                setBody={props.setBody}
              />
            );
          })
          .catch((err) => alert(err));
      }}
    ></div>
  );
};

export default SupprimerButton;
