import axios from "axios";
import React, { Component } from "react";
import LoginPage from "../../../../../login/LoginPage";
import {getToken, testToken, getLoginFromToken} from "../../../../general/token.js"

class StarButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isLiked: false };
    this.token = getToken()
  }

  componentWillMount() {
    if (this.token) {
      const login  =  getLoginFromToken();
     
      for (let starsLogin in this.props.message.stars) {
        if ((starsLogin = login)) {
          this.setState({ isLiked: true });
          break;
        }
      }
      
    }
  }

  aimerPublication() {
    if (!testToken(this.token)) {
      this.props.setBody(<LoginPage setBody={this.props.setBody} />);
      return;
    }
    axios
      .post("/api/message/star", {
        message_id: this.props.message._id,
        liked: this.state.isLiked,
        login : getLoginFromToken()
      },{
        headers: {
          authorization: "Bearer " + this.token,
        },
      })
      .then((res) => this.setState({ isLiked: res }))
      .catch((err) => alert(err));
  }

  render() {
    return (
      <div
        className="message_button fa-solid fa-star fa-xl"
        onClick={(event) => {
          this.aimerPublication();
        }}
        style={{ color: this.state.isLiked ? "green" : "#b0c9da" }}
      ></div>
    );
  }
}

export default StarButton;
