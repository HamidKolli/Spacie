import ProfilList from "../../../../profil/ProfilList";

import React, { Component } from "react";
import axios from "axios";

export default class StarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {resultat : null};
  }

  componentWillMount() {
    for (let i in this.props.messages.star) {
      axios.get("/api/user/info/" + i).then((res) => {
        this.setState({
          resultat: this.state.resultat.concat(res.data),
        });
      })
    }
  }
  render() {

    return (
      <ProfilList
        setPage={this.props.setPage}
        resultat={this.state.resultat}
        setBody={this.props.setBody}
      />
    );
  }
}
