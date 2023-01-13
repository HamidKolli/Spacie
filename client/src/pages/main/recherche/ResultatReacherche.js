import axios from "axios";
import React, { Component } from "react";
import MessageList from "../accueil/message/MessagesList";
import ProfilList from "../profil/ProfilList";
import {getLoginFromToken}  from "../general/token.js";

class ResultatReacherche extends Component {
  constructor(props) {
    super(props);
    this.state = {
      container: null,
    };
  }

  componentWillReceiveProps(props) {
    this.props = props;
    this.componentWillMount();
  }

  componentWillMount() {
    if (!this.props.recherche) return;
    if (this.props.recherche[0] == "@") {
      axios
        .get("/api/user/"+this.props.recherche.substring(1))
        .then((res) => {
          if(!res.data) {
            this.setState({container: <div>Aucun résultat</div>});
            return;
          }
          this.setState({
            container: (
              <ProfilList
                setPage={this.props.setPage}
                resultat={[res.data]}
                setBody={this.props.setBody}
              />
            ),
          });
        })
        .catch((err) => this.setState({ container: <div>{err.data}</div> }));

      return;
    }
    let root  = "/api/message/recherche"
    if (this.props.recherche[0] == "#") {
      root += "/hashtags"
      this.props.recherche = this.props.recherche.substring(1); 
    }
     

    console.log("root: "+root);
    console.log("Recherche: "+this.props.recherche);
    let login = getLoginFromToken();
    axios
      .get(root ,  {message :this.props.recherche,login : login} )
      .then((res) => {
        console.log(res.data)
        if(res.data.length == 0){
          this.setState({ container: <div>Aucun résultat</div> });
        }else{
        this.setState({
          container: (
            <MessageList
              setPage={this.props.setPage}
              resultat={res.data}
              setBody={this.props.setBody}
            />
          ),
        });
        }})
  
      .catch((err) => this.setState({ container: <div>{err.data}</div> }));
  }


  render() {
   
    return this.state.container;
  }
}

export default ResultatReacherche;
