import React, { Component } from "react";
import CommenteButton from "./reaction/commentaires/CommenteButton";
import StarButton from "./reaction/star/StarButton.js";
import RepostButton from "./reaction/partage/RepostButton";
import UserInfoDate from "../../general/UserInfoDate";
import SupprimerButton from "./reaction/SupprimerButton";
import ModifierButton from "./reaction/modifier/ModifierButton";
import StarPage from "./reaction/star/StarPage";
import axios from "axios";
import {getToken, getLoginFromToken} from "../../general/token.js";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reaction: null,
      messageResult: null,
      styleMessage: null,
      userConnect: null,
      sender: null,
    };

    this.setReaction = this.setReaction.bind(this);
    this.token =  getToken()
    this.clickedStar = false;
    this.setMessageResult = this.setMessageResult.bind(this);
  }
  componentWillMount() {
    this.setState({userConnect : getLoginFromToken()});
    axios.get("/api/user/"+ this.props.message.sender)
    .then(res => this.setState({sender: res.data}))
    .catch(err => alert(err))
  }

  componentWillReceiveProps(props) {
    this.props = props;
  }

  getNombreStars() {
    return this.props.message.stars.length;
  }
  // getNombreCommentaires() {
  //   return this.props.message.commentaires.length;
  // }
  getNombrePartages() {
    return this.props.message.shars;
  }
  getReaction() {
    return this.state.reaction;
  }
  setReaction(reaction) {
    this.setState({ reaction: reaction });
  }
  setMessageResult(message, style) {
    this.setState({ messageResult: message, styleMessage: style });
  }
  getMessageResul() {
    if (this.state.messageResult)
      return (
        <div style={this.state.styleMessage}>{this.state.messageResult}</div>
      );
    return;
  }
  render() {
    return (
      <article className="message">
        <UserInfoDate
          user={this.state.sender}
          setPage={this.props.setPage}
          date={this.props.message.date}
        />
        <div className="message_textuel">{this.props.message.message}</div>
        {this.props.message.image && (
          <img
            style={{ width: "100%" }}
            src={this.props.message.image}
            alt=""
          ></img>
        )}
        <div className="message_buttons">
          <div className="reaction_message">
            <StarButton
              setPage={this.props.setPage}
              message={this.props.message}
              setBody={this.props.setBody}
            />
            <span
              onClick={() => {
                this.clickedStar = !this.clickedStar;

                this.setReaction(
                  this.clickedStar ? (
                    <StarPage
                      message={this.props.message}
                      setBody={this.props.setBody}
                      setPage={this.props.setPage}
                    />
                  ) : null
                );
              }}
            >
              {this.getNombreStars()}
            </span>
          </div>

          {!this.props.message_id ? (
            <div className="reaction_message">
              <CommenteButton
                setBody={this.props.setBody}
                message={this.props.message}
                setReaction={this.setReaction}
              />
              {/* <span>{this.getNombreCommentaires()} </span> */}
            </div>
          ) : (
            ""
          )}

          <div className="reaction_message">
            {this.state.userConnect === this.props.message.sender ? (
              <SupprimerButton
                setBody={this.props.setBody}
                setPage={this.props.setPage}
                messageID={this.props.message._id}
                setMessageResult={this.setMessageResult}
              />
            ) : !this.props.comment ? (
              <RepostButton
                setBody={this.props.setBody}
                message={this.props.message}
                setPage={this.props.setPage}
                setMessageResult={this.setMessageResult}
              />
            ) : (
              ""
            )}
            {this.state.userConnect != this.props.message.sender &&
              !this.props.comment && <span>{this.getNombrePartages()} </span>}
          </div>

          <div className="reaction_message">
            {this.state.userConnect == this.props.message.sender && (
              <ModifierButton
                setBody={this.props.setBody}
                message={this.props.message}
                setReaction={this.setReaction}
              />
            )}
          </div>
        </div>
        {this.getMessageResul()}
        {this.getReaction()}
      </article>
    );
  }
}

export default Message;
