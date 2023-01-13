import React, { Component } from "react";
import NewMessage from "./message/NewMessage.js";
import MessageList from "./message/MessagesList.js";
import axios from "axios";
import {getToken,testToken,getLoginFromToken} from "../general/token.js";
class Accueil extends Component {
  constructor(props) {
    super(props);
    this.token = getToken()
    this.state = {
      resultat: [],
    };
    this.refresh = this.refresh.bind(this);
  }

  componentWillMount() {
    this.refresh();
  }

  componentWillReceiveProps(props) {
    this.props = props;
    this.refresh();
  }

  refresh() {
    console.log("refresh");
    axios
      .get("/api/message/",{login : getLoginFromToken()})
      .then((res) => {this.setState({ resultat: res.data });console.log("res: "+this.state.resultat)})
      .catch((err) =>{ 
        alert(err);
        this.setState({ resultat: [] });
      });
  }

  getNewMessageComponent() {
    if (testToken(this.token)) {
      return (
        <NewMessage
          setPage={this.setPage}
          erreur={this.props.erreur}
          setBody={this.props.setBody}
          refresh={this.refresh}
        />
      );
    }
  }

  render() {
    return (
      <div className="millieu">
        {this.getNewMessageComponent()}
        <MessageList
          setBody={this.props.setBody}
          setPage={this.props.setPage}
          resultat={this.state.resultat}
        />
      </div>
    );
  }
}

export default Accueil;
