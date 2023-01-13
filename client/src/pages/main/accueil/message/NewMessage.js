import React, { Component } from "react";
import { ImagePicker } from "react-file-picker";
import Picker from "emoji-picker-react";
import Popup from "reactjs-popup";
import axios from "axios";
import { getLoginFromToken, getToken } from "../../general/token.js";
class NewMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      image: this.props.message ? this.props.message.image : "",
      erreur: "",
      newMessage: this.props.message ? this.props.message.text : "",
    };
    this.token = getToken()
    this.onEmojiClick = this.onEmojiClick.bind(this);
  }

  componentWillReceiveProps(props) {
    this.props = props;
    this.setState ({
      check: false,
      image: this.props.message ? this.props.message.image : "",
      erreur: "",
      newMessage: this.props.message ? this.props.message.text : "",
    });
    this.token = getToken()
    this.onEmojiClick = this.onEmojiClick.bind(this);
  }

  sendMessage(event) {
    axios
      .post(
        this.props.messageID
          ? "/api/message/commentaire/" + this.props.messageID
          : this.props.message
          ? "/api/message/update/" + this.props.message.id
          : "/api/message/create",
        {
          login: getLoginFromToken(),
          messageText: this.state.newMessage,
          image: this.state.image,
          private : this.state.check,
        },{
          headers: {
            authorization: "Bearer " + this.token,
          },
        }
      ).then(()=> this.props.refresh && this.props.refresh() )
      .catch((err) => this.setState({ erreur: err.data }));
      
  }

  checkPubPrivee() {
    this.setState({ check: !this.state.check });
  }
  imagePicker() {
    return (
      <ImagePicker
        extensions={["jpg", "jpeg", "png"]}
        onChange={(base64) => {
          this.setState({ image: base64 });
        }}
        dims={{
          minWidth: 100,
          maxWidth: 10000,
          minHeight: 100,
          maxHeight: 10000,
        }}
        onError={(errMsg) => {
          this.setState({ erreur: errMsg });
        }}
      >
        <button
          title="Inserer une Image"
          className="fa-solid fa-panorama fa-xl"
        ></button>
      </ImagePicker>
    );
  }

  onEmojiClick(event, emojiObject) {
    this.setState({ newMessage: this.state.newMessage + emojiObject.emoji });
  }

  render() {
    return (
      <section className="new_message">
        <textarea
          value={this.state.newMessage}
          name="commentaire"
          placeholder="votre vie"
          onChange={(event) =>
            this.setState({ newMessage: event.target.value })
          }
        />
        {this.state.image && <img src={this.state.image} alt=""></img>}
        <div id="footer_new_message">
          <div id="message_prive" onClick={(event) => this.checkPubPrivee()}>
            <span
              className={
                "fa-solid fa-square" + (this.state.check ? "-check" : "")
              }
              id="check"
              alt="Media"
            ></span>
            <span>Publication privée</span>
          </div>
          <div className="button_new_message">
            {this.state.image !== "" && (
              <span
                title="Enlever l'image "
                className="fa-solid fa-xmark fa-xl"
                onClick={(event) => this.setState({ image: "" })}
              >
                {" "}
              </span>
            )}
            <Popup
              trigger={
                <span
                  title="Emoji"
                  className="fa-solid fa-user-astronaut fa-xl"
                >
                  {" "}
                </span>
              }
              closeOnDocumentClick
              closeOnEscape
              position="bottom center"
            >
              <Picker onEmojiClick={this.onEmojiClick}></Picker>
            </Popup>
            {this.imagePicker()}
            <div
              onClick={(event) => {
                this.sendMessage(event);
              }}
              className="buttons"
            >
              Publier
            </div>
          </div>
        </div>

        <div className="erreur">{this.state.erreur}</div>
      </section>
    );
  }
}

export default NewMessage;
