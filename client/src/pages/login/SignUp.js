import axios from 'axios';
import React, { Component } from 'react';
import '../../assets/css/login.css'
import Main from '../main/Main.js'
import LoginPage from './LoginPage'
import {setToken} from "../main/general/token.js";
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { messageErreur: "" }
        this.login = ""
        this.date = ""
        this.email = ""
        this.motDePasse = ""
        this.confPassword = ""
    }
    gotoConnection() {
        this.props.setBody(<LoginPage setBody={this.props.setBody}  />)
    }

    gotoAccueil() {
        this.props.setBody(<Main  setBody={this.props.setBody}  />)
    }

    getErreur() {
        return <div className="breaker" style={{ color: "white", backgroundColor: "red", maxLength: "30px", fontWeight: "bold" }}><span>{this.state.messageErreur}</span></div>
    }

    signUp() {

        const regEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$")

        if (this.motDePasse == "" || this.confPassword == "" || this.login == "" || this.date == "" || this.email == "") {
            this.setState({ messageErreur: "un des champs est vide, veuillez remplir tout les champs" })
            return
        }

        if (!regEmail.test(this.email)) {
            this.setState({ messageErreur: "mail invalide" })
            return
        }
        if (this.motDePasse != this.confPassword) {
            this.setState({ messageErreur: "le mot de passe de confirmation est different du mot de passe" })
            return
        }



        axios.post("/api/user/signup",
        {
            login: this.login,
            date: this.date,
            email: this.email,
            motDePasse: this.motDePasse

        }
        ).then((res) => {
            setToken(res.data)
            this.props.setBody(<Main setBody={this.props.setBody} />)
        }
        ).catch((err) => {
            this.setState({ messageErreur: err.message })
        })

    }


    render() {
        return <div id="login">

            <header>
                <div id="header_login">
                    <div id="logo" >
                        <img src="https://media.spacie.fr/default/pages/icon.png" alt="logo" width="128" height="128" />
                    </div >
                    <div id="title"><p>Spacie</p></div>
                </div >
            </header>
            <section id="block_con">
                <h2 id="titre_con">SignUp</h2>
                {this.getErreur()}
                <div className="text">
                    <input type="text" name="login" placeholder="login: Fristorm" maxLength="30"
                        alt="le login doit avoir que des lettres et des chiffres" onChange={event => this.login = event.target.value} />
                </div>
                <div className="text">
                    <input type={this.state.dateRef} style={{ textAlign: "center" }} placeholder="Date de naissence" onFocus={event => this.setState({ dateRef: "date" })} onBlur={() => this.setState({ dateRef: "text" })} onChange={event => this.date = event.target.value} />
                </div>

                <div className="text">
                    <input type="email" name="Email" placeholder="email : email@domain.tln/" maxLength="30" onChange={event => this.email = event.target.value} />
                </div>
                <div className="text">
                    <input type="password" name="Mot de Passe" placeholder="Votre mot de passe" maxLength="30" onChange={event => this.motDePasse = event.target.value} />
                </div>
                <div className="text">
                    <input type="password" name="Confirmez le mot de passe" placeholder="Confirmez votre mot de passe"
                        maxLength="30" onChange={event => this.confPassword = event.target.value} />
                </div>
                <br />
                <div className="h-captcha" data-sitekey="5ecff875-84d2-42d0-939c-32fe8d536fb0"></div>
                <div className="button">
                    <input type="submit" name="Enregistre" value="Envoyer" onClick={() => this.signUp()} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="lien">
                        <span onClick={(event) => { this.gotoAccueil(); event.stopPropagation() }}>Accueil</span>
                    </div>
                    <div className="lien">
                        <span onClick={(event) => { this.gotoConnection(); event.stopPropagation() }}>Connexion</span>
                    </div>
                </div>
            </section >

        </div >
    }
}

export default SignUp