import React, { Component } from "react";
import ProfilInfo from "./ProfilInfo";
class ProfilList extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div id="modificationProfil">
        {this.props.resultat.map((e, index) => (
          <ProfilInfo
            key={index}
            setPage={this.props.setPage}
            setBody={this.props.setBody}
            user={e}
          />
        ))}
      </div>
    );
  }
}

export default ProfilList;
