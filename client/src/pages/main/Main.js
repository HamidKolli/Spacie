import React, { Component } from "react";
import Accueil from "./accueil/Accueil.js";
import "../../assets/css/index.css";
import Header from "./header/Header.js";
import Suggestion from "./Suggestion.js";

class Main extends Component {
  constructor(props) {
    super(props);
    this.setPage = this.setPage.bind(this);
    this.state = {
      page: null,
    };
  }

  componentWillMount() {
    this.setPage(
      <Accueil
        setBody={this.props.setBody}
        setPage={this.setPage}
      />
    );
  }
  setPage(cl) {
    this.setState({ page: cl });
  }

  getPage() {
    return this.state.page;
  }

  render() {
    return (
      <div id="mainPage">
        <Header
          serveur={this.props.serveur}
          setPage={this.setPage}
          setBody={this.props.setBody}
        />
        <div id="corps">
          <Suggestion
            serveur={this.props.serveur}
            setPage={this.setPage}
            setBody={this.props.setBody}
          />
          {this.getPage()}
          <div id="pubs"></div>
        </div>
      </div>
    );
  }
}

export default Main;
