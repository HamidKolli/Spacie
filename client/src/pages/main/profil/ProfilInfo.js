import React, { Component } from "react";
import UserInfo from "../general/UserInfo";
import AjouterButton from "../general/AjouterButton";
import SupprimerAmiButton from "../general/SupprimerAmiButton";
import {getToken,testToken,getLoginFromToken}  from "../general/token.js";
class ProfilInfo extends Component {
  constructor(props) {
    super(props);
    this.token = getToken()
  }

  render() {
    const login = getLoginFromToken()
    return (
      <div className="profil_info">
        <div className="user_info">
          <UserInfo user={this.props.user} setPage={this.props.setPage} />
          {testToken(this.token) &&
            (this.props.user.amis.filter(loginAmi => loginAmi == login).length > 0 ? (
              <SupprimerAmiButton login={this.props.user._id} />
            ) : (
              <AjouterButton login={this.props.user._id} />
            ))}
        </div>
      </div>
    );
  }
}

export default ProfilInfo;
