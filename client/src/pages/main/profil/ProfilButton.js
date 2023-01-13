import axios from "axios";
import React, { Component } from "react";
import Profil from "./Profil.js";
import {getToken,getLoginFromToken} from "../general/token.js"

class ProfilButton extends Component {
  constructor(props) {
    super(props);

    this.token = getToken()
    this.state = { user: null };
  }
  componentWillMount() {
    
    axios
    .get("/api/user/" + getLoginFromToken())
    .then((res) => {
      this.setState({user : res.data})
    })
    .catch((err) => {
      alert(err);
    });
  }

  gotoProfil() {
        this.props.setPage(
          <Profil
            setBody={this.props.setBody}
            setPage={this.props.setPage}
            user={this.state.user}
          />
        );
  }

  render() {
    console.log(this.state.user)
    if(!this.state.user)
       return(<div></div>)
    return (
      <div id="lien_profil">
        <span onClick={() => this.gotoProfil()}>
          <img src={this.state.user.photo} alt="photo de profil" />
        </span>
      </div>
    );
  }
}

export default ProfilButton;
