import React, { Component } from "react";
import Main from "../main/Main.js";
import SignUp from "./SignUp.js";
import "../../assets/css/login.css";
import axios from "axios";
import {setToken} from "../main/general/token.js";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.login = "";
    this.password = "";
    this.state = { messageErreur: "" };
  }

  connecte() {
    if (this.login == "" || this.password == "") {
      this.setState({ messageErreur: "veuillez remplir tous les champs" });
      return;
    }
   axios
      .post("/api/user/signin", { login: this.login, motDePasse: this.password })
      .then((res) => {
        setToken(res.data);
        this.props.setBody(<Main setBody={this.props.setBody} />);
      })
      .catch((err) => {
        this.setState({ messageErreur: err.message });
      });
  }

  gotoSignIn() {
    this.props.setBody(
      <SignUp serveur={this.props.serveur} setBody={this.props.setBody} />
    );
  }

  gotoAccueil() {
    this.props.setBody(
      <Main serveur={this.props.serveur} setBody={this.props.setBody} />
    );
  }

  getErreur() {
    return (
      <div
        className="breaker"
        style={{ color: "white", backgroundColor: "red" }}
      >
        <span>{this.state.messageErreur}</span>
      </div>
    );
  }
  render() {
    return (
      <div id="login">
        <header>
          <div id="header_login">
            <div id="logo">
              <img
                src="https://media.spacie.fr/default/pages/icon.png"
                alt="logo"
                width="128"
                height="128"
              />
            </div>
            <div id="title">
              <p>Spacie</p>
            </div>
          </div>
        </header>
        <section id="block_con">
          <h2 id="titre_con">Log in</h2>

          {this.getErreur()}

          <div className="text">
            <input
              type="text"
              name="Login"
              placeholder="Login"
              maxLength="30"
              onChange={(event) => (this.login = event.target.value)}
            />
          </div>
          <div className="text">
            <input
              type="password"
              name="password"
              placeholder="password"
              maxLength="30"
              onChange={(event) => (this.password = event.target.value)}
            />
          </div>
          <div className="button">
            <input
              type="button"
              onClick={() => this.connecte()}
              name="Connexion"
              value="Connexion"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="lien">
              <span
                onClick={(event) => {
                  this.gotoAccueil();
                  event.stopPropagation();
                }}
              >
                Accueil
              </span>
            </div>
            <div className="lien">
              <span
                href=""
                onClick={(event) => {
                  this.gotoSignIn();
                  event.stopPropagation();
                }}
              >
                Inscription
              </span>
            </div>
          </div>
        </section>
        <footer>
          <p>Copyright © 2022 Spacie - Tous droits réservés.</p>
        </footer>
      </div>
    );
  }
}

export default LoginPage;
