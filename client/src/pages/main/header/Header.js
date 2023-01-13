import React, { Component } from "react";
import LoginButton from "../../login/LoginButton";
import LoginPage from "../../login/LoginPage";
import Accueil from "../accueil/Accueil";
import AmiPage from "../listeAmis/AmiPage";
import NotificationPage from "../notification/NotificationPage";
import ProfilButton from "../profil/ProfilButton";
import Recherche from "../recherche/Recherche";
import HeaderItem from "./HeaderItem";
import {getToken, getLoginFromToken,testToken} from "../general/token.js"

class Header extends Component {
  constructor(props) {
    super(props);
    this.setPage = this.props.setPage;
    this.token = getToken()

    this.state = {
      login: "",
    };
  }
  componentWillMount() {
    if (testToken(this.token)){
      this.setState({login: getLoginFromToken()});
    }
  }
  render() {
    return (
      <header>
        <div id="logo">
          <div id="header_main">
            <div id="logo_image">
              <img
                src="https://media.spacie.fr/default/pages/icon.png"
                alt="logo"
                width="128"
                height="128"
              />
            </div>
            <span id="title">Spacie</span>
          </div>
        </div>
        <div id="onglet">
          <HeaderItem
            onClick={() =>
              this.setPage(
                <Accueil
                  setBody={this.props.setBody}
                  setPage={this.setPage}
                />
              )
            }
            image="https://media.spacie.fr/default/pages/svg/home.svg"
            nom="Acceuil"
          />
          <HeaderItem
            onClick={() =>
              this.setPage(
                <Recherche
                  setBody={this.props.setBody}
                  setPage={this.setPage}
                />
              )
            }
            image="https://media.spacie.fr/default/pages/svg/search.svg"
            nom="Rechercher"
          />
          <HeaderItem
            onClick={() => {
              testToken(this.token)
                ? this.setPage(
                    <NotificationPage
                      setBody={this.props.setBody}
                      setPage={this.setPage}
                    />
                  )
                : this.props.setBody(
                    <LoginPage
                      setBody={this.props.setBody}
                    />
                  );
            }}
            image="https://media.spacie.fr/default/pages/svg/bell.svg"
            nom="Notification"
          />

          <HeaderItem
            onClick={() => {
              testToken(this.token)
                ? this.setPage(
                    <AmiPage
                      setBody={this.props.setBody}
                      setPage={this.setPage}
                    />
                  )
                : this.props.setBody(
                    <LoginPage
                      setBody={this.props.setBody}
                    />
                  );
            }}
            image="https://media.spacie.fr/default/pages/svg/friendlist.svg"
            nom="Ami"
          />
        </div>
        <div id="lien_profil">
          {!testToken(this.token) ? (
            <LoginButton
              setBody={this.props.setBody}
            />
          ) : (
            <ProfilButton
              setBody={this.props.setBody}
              setPage={this.setPage}
            />
          )}
        </div>
      </header>
    );
  }
}

export default Header;
