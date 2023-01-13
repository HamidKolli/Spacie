import React, { Component } from "react";
import Profil from "../profil/Profil";
class UserInfo extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(props) {
    this.props = props;
  }

  gotoProfil() {
    this.props.setPage(
      <Profil
        setBody={this.props.setBody}
        setPage={this.setPage}
        user={this.props.user}
      />
    );
  }

  render() {
    if (!this.props.user) 
      return <div></div>;
    return (
      <div className="userName">
        <span className="photoProfil" onClick={(event) => this.gotoProfil()}>
          <img
            src={this.props.user.photo}
            alt="pdp"
            width="40"
            height="40"
          />
        </span>
        <span className="name" onClick={(event) => this.gotoProfil()}>
          {this.props.user.nickName}
        </span>
      </div>
    );
  }
}

export default UserInfo;
