import axios from "axios";
import React, { Component } from "react";
import { ImagePicker } from "react-file-picker";
import LoginPage from "../../login/LoginPage";
import {getToken,setToken} from "../general/token.js"
import Profil from "./Profil";
export default class EditProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.user.photo,
      nickName: this.props.user.nickName,
      bibliographie: this.props.user.biographie,
     
      messageErreur: "",
      termeBloquer : ""
    };

    this.token = getToken()

    this.confPassword = "";
    this.newPassword = "";
    this.motDePasse = "";
  }

  componentWillReceiveProps(props) {
    this.props = props;
    this.setState({
      image: this.props.user.photoProfil,
      nickName: this.props.user.nickName,
      bibliographie: this.props.user.biographie,
      messageErreur: "",
      termeBloquer : ""
    });
    this.confPassword = "";
    this.newPassword = "";
  }

  getErreur() {
    return (
      <div
        className="erreur"
        style={{ color: "white", backgroundColor: "red", width: "100%" }}
      >
        <span>{this.state.messageErreur}</span>
      </div>
    );
  }

  sauvgarder() {
   

    if (
      this.newPassword !== "" &&
      this.confPassword !== "" &&
      this.newPassword !== this.confPassword
    ) {
      this.setState({
        messageErreur:
          "le mot de passe de confirmation est différent du mot de passe",
      });
      return;
    }
    let password = this.motDePasse;
    if (this.newPassword !== "") password = this.newPassword;

    axios
      .post("/api/user/edit", {
        login: this.props.user._id,
        nickName: this.state.nickName,
        bibliographie: this.state.bibliographie,
        photo: this.state.image,
        motDePasse: password,
        ancienMotDePasse: this.motDePasse,
      },{
        headers: {
          authorization: "Bearer " + this.token,
        },
      })
      .then(() => {
        this.props.setPage(
          <Profil
            setBody={this.props.setBody}
            setPage={this.props.setPage}
            user={{
              login: this.props._id,
              nickName: this.state.nickName,
              bibliographie: this.state.bibliographie,
              photo: this.state.image,
              amis : this.props.user.amis,
              messages : this.props.user.messages,
              email : this.props.user.email,
              dateCreation : this.props.user.dateCreation,
              dateNaissance : this.props.user.dateNaissance,
            }}
          />
        );
        this.props.close();
      })
      .catch((err) => {
        this.setState({ messageErreur: err.message });
      });
  }

  supprimerCompte() {
    axios
      .delete("/api/user/" + this.props.login, {login: this.props.user_id, headers: {
        authorization: "Bearer " + this.token,
      },})
      .then((res) => {
        setToken({token : "",login : ""});
        this.props.setBody(
          <LoginPage
            serveur={this.props.serveur}
            setBody={this.props.setBody}
          />
        );
      })
      .catch((err) => {
        this.setState({ messageErreur: err.message });
      });
  }

  ajouterTermeBloquer() {
    if(!this.state.termeBloquer)
      return
    axios.put("/api/user/addTermeBloque", {
      terme : this.state.termeBloquer,
    },{
      headers: {
        authorization: "Bearer " + this.token,
      },
    })
    .then((res) => {alert("terme bloqué ajouté")})
    .catch((err) => {alert(err)});
  }

  supprimerTermeBloquer() {
    if(!this.state.termeBloquer)
      return
    axios.put("/api/user/removeTermeBloque", {
      terme : this.state.termeBloquer,
    },{
      headers: {
        authorization: "Bearer " + this.token,
      },
    })
    .then((res) => {alert("terme bloqué est supprimé")})
    .catch((err) => {alert(err)});
  }

  render() {
    return (
      <div id="edit_profil">
        <div className="photoProfil">
          <img id="pdp" src={this.state.image} alt="Profil" />
        </div>
        <div>
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
            <button className="buttons">Editer</button>
          </ImagePicker>
        </div>
        {this.getErreur()}

        <div className="edit_content">
          <div>Nick name</div>
          <div className="text">
            <input
              type="text"
              name="nickName"
              placeholder={this.props.user.nickName}
              maxLength="30"
              alt="le nickname doit avoir que des lettres et des chiffres"
              onChange={(event) =>
                this.setState({ nickName: event.target.value })
              }
            />
          </div>
        </div>
        <div className="edit_content">
          <div>Biographie</div>
          <div className="text">
            <input
              type="text"
              name="Biographie"
              placeholder={this.props.user.biographie}
              maxLength="150"
              alt="le login doit avoir que des lettres et des chiffres"
              onChange={(event) =>
                this.setState({ bibliographie: event.target.value })
              }
            />
          </div>
        </div>
        <div className="edit_content">
          <div>Mot de passe actuel</div>
          <div className="text">
            <input
              type="password"
              name="Mot de Passe"
              placeholder="Votre mot de passe"
              maxLength="30"
              onChange={(event) => (this.motDePasse = event.target.value)}
            />
          </div>
        </div>
        <div className="edit_content">
          <div>Nouveau mot de passe</div>
          <div className="text">
            <input
              type="password"
              name="Confirmez le mot de passe"
              placeholder="votre nouveau mot de passe"
              maxLength="30"
              onChange={(event) => (this.newPassword = event.target.value)}
            />
          </div>
        </div>
        <div className="edit_content">
          <div>Confirmation du mot de passe</div>
          <div className="text">
            <input
              type="password"
              name="Confirmez le mot de passe"
              placeholder="Confirmez votre mot de passe"
              maxLength="30"
              onChange={(event) => (this.confPassword = event.target.value)}
            />
          </div>
        </div>
        <div className="edit_content">
          <div>Terme bloquer</div>
          <div className="text">
            <input
              type="text"
              name="Biographie"
              placeholder="terme bloauer"
              maxLength="150"
              onChange={(event) =>
                this.setState({ termeBloquer: event.target.value })
              }
            />
            <div
            className="buttons"
            onClick={(event) => {
              this.ajouterTermeBloquer();
            }}
          >
            Ajouter
            
          </div><div
            className="buttons"
            onClick={(event) => {
              this.supprimerTermeBloquer();
            }}
          >
            Supprimer
          </div>

          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div
            className="buttons"
            onClick={(event) => {
              this.sauvgarder();
            }}
          >
            Sauvegarder
          </div>
          <div
            className="buttons"
            onClick={(event) => {
              this.props.close();
            }}
          >
            Fermer
          </div>
          <div
            className="buttons"
            onClick={(event) => {
              this.supprimerCompte();
            }}
          >
            Supprimer
          </div>
        </div>
      </div>
    );
  }
}
