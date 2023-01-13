import React, { Component } from "react";
import LoginPage from "../../../../../login/LoginPage.js";
import CommentePage from "./CommentePage.js";
import {getToken,testToken } from "../../../../general/token.js";
class CommenteButton extends Component {
  constructor(props) {
    super(props);
    this.token = getToken()
    this.visible = false;
  }

  commentairePublication() {
    this.visible = !this.visible;
    if (!testToken(this.token)) {
      this.props.setBody(
        <LoginPage setBody={this.props.setBody} serveur={this.props.serveur} />
      );
      return;
    }
    this.props.setReaction(
      this.visible ? (
        <CommentePage
          setBody={this.props.setBody}
          setPage={this.props.setPage}
          message={this.props.message}
        />
      ) : (
        ""
      )
    );
  }
  render() {
    return (
      <div
        className="message_button fa-solid fa-comment-dots fa-xl"
        onClick={(event) => {
          this.commentairePublication();
        }}
      ></div>
    );
  }
}

export default CommenteButton;
