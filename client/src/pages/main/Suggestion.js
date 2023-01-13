import axios from "axios";
import React, { Component } from "react";
import ProfilList from "./profil/ProfilList";
import {getToken,testToken,getLoginFromToken} from "./general/token.js";
class Suggestion extends Component {
  constructor(props) {
    super(props);
    this.token = getToken()
    this.state = {
      resultat: [],
    };
  }
  componentWillMount() {
    if (testToken(this.token))
      axios
        .get("/api/user/info/all", {login : getLoginFromToken(), 
          headers: {
          authorization: "Bearer " + this.token,
          }
        })
        .then((res) => {
          this.setState({ resultat: res.data.length > 5 ? res.data.slice(0,5) : res.data });
        })
        .catch((err) => {
          this.setState({ resultat: [] });
        });
  }
  render() {
    if (testToken(this.token))
      return (
        <div id="suggestion_profil">
          <ProfilList
            setPage={this.props.setPage}
            setBody={this.props.setBody}
            resultat={this.state.resultat}
          />

          <div
            className="buttons"
            onClick={() => {
              axios
              .get("/api/user/info/all", {login : getLoginFromToken(), 
                headers: {
                authorization: "Bearer " + this.token,
                }
              })
              .then((res) => {
                this.setState({ resultat: res.data.length > 5 ? res.data.slice(0,5) : res.data });
              })
              .catch((err) => {
                this.setState({ resultat: [] });
              });
            }}
          >
            Suggerer
          </div>
        </div>
      );

    return <div id="suggestion_profil"></div>;
  }
}

export default Suggestion;
