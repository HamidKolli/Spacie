import axios from "axios";
import LoginPage from "../../../../../login/LoginPage";
import React from "react";
import {getLoginFromToken, getToken,testToken} from "../../../../general/token.js"
const RepostButton = (props) => {
  let token = getToken()
  return (
    <div
      className="message_button fa-solid fa-rocket fa-xl"
      onClick={() => {
        if (!testToken(token)) {
          this.props.setBody(<LoginPage setBody={props.setBody} />);
          return;
        }
        axios
          .post(
            "/api/message/repost/"+ props.message.id,
          {login : getLoginFromToken()},{
            headers: {
              authorization: "Bearer " + getToken(),
            },
          }
          )
          .then((res) => props.setMessageResult(res, { color: "green" }))
          .catch((err) => props.setMessageResult(err, { color: "red" }));
      }}
    ></div>
  );
};

export default RepostButton;
