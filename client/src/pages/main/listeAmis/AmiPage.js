import axios from "axios";
import React, { Component } from "react";
import { getLoginFromToken , getToken} from "../general/token";
import ListeAmis from "./ListeAmis";

class AmiPage extends Component {
  constructor(props) {
    super(props);
    this.refresh= this.refresh.bind(this);
    this.state = {
      resultat: [],
    };
  }

  componentWillMount() {
    this.refresh();
  }

  refresh() {
    console.log("refresh amis  ")
    axios
      .get("/api/friend/",
      {login : getLoginFromToken(),  headers: {
        authorization: "Bearer " + getToken(),
      },}
      )
      .then((res) => {
        this.setState({ resultat: res.data });
      })
      .catch(() => this.setState({ resultat: [] }));
}

  render() {
    return (
      <div className="millieu">
        <ListeAmis
          users={this.state.resultat}
          setPage={this.props.setPage}
          refresh={this.refresh}
        />
      </div>
    );
  }
}

export default AmiPage;
