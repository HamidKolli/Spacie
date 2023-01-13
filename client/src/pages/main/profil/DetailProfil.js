import React, { Component } from "react";
const date = require("../general/date.js");

class DetailProfil extends Component {
  constructor(props) {
    super(props);
    this.date = date.getDate(this.props.user.creationDate);
  }
  componentWillReceiveProps(props) {
    this.props = props;
    this.date = date.getDate(this.props.user.dateCreation);
    this.dateNaissance = date.getDate(this.props.user.dateNaissance);
  }
  render() {
    return (
      <div id="detail_profil">
        <div className="info_ligne">
          <div className="info">
            <h3>Login</h3>
            <p>{this.props.user._id}</p>
          </div>

          <div className="info">
            <h3>Nick name</h3>
            <p>{this.props.user.nickName}</p>
          </div>
        </div>

        <div className="info_ligne">
          <div className="info">
            <h3>Date de Création</h3>
            <p className="breaker">
              {this.date}
            </p>
          </div>
          <div className="info">
            <h3>Date de naissance</h3>
            <p className="breaker">
              {this.dateNaissance}
            </p>
          </div>
        </div>
        <div className="info_ligne">
          <div className="info">
            <h3>email</h3>
            <p className="breaker">{this.props.user.email}</p>
          </div>
          <div className="info">
            <h3>Biographie</h3>
            <p className="breaker">{this.props.user.biographie}</p>
          </div>
        </div>
        <div className="info_ligne">
          <div className="info">
            <h3>Amis</h3>
            <p className="breaker">{this.props.user.amis.length}</p>
          </div>
        </div>
        <div className="info_ligne">
          <div className="info">
            <h3>Messages</h3>
            <p className="breaker">{this.props.user.messages.length}</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="buttons"
            onClick={(event) => {
              this.props.close();
            }}
          >
            Close
          </div>
        </div>
      </div>
    );
  }
}

export default DetailProfil;
