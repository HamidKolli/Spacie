import axios from "axios";
import React, { Component } from "react";
import { getLoginFromToken } from "../general/token";
import NotificationList from "./NotificationList";
import { getToken } from "../general/token";

export default class NotificationPage extends Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.state = {
      resultat: [],
    };
    
  }
  componentWillMount() {
    this.refresh();
  }
  componentWillReceiveProps(props) {
    this.componentWillMount(props)
  }

    refresh() {
      console.log("refresh notif  ")
      axios
        .get("/api/notification/",{login : getLoginFromToken(),headers: {
          authorization: "Bearer " + getToken(),
      }},
      )
      .then((res) => {
        this.setState({ resultat: res.data });
      })
      .catch((err) => this.setState({ resultat: [] }));
  }
  render() {
    return (
      <div className="millieu">
        <NotificationList
          setBody={this.props.setBody}
          setPage={this.props.setPage}
          resultat={this.state.resultat}
          refresh={this.refresh}
        />
      </div>
    );
  }
}
