import React, { Component } from "react";
import Notification from "./Notification";

class NotificationList extends Component {
  render() {
    return (
      <section>
        {this.props.resultat.map((e, index) => (
          <Notification
            setBody={this.props.setBody}
            setPage={this.props.setPage}
            refresh={this.props.refresh}
            notification={e}
          />
        ))}
      </section>
    );
  }
}

export default NotificationList;
