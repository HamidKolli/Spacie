import Message from "../../Message";
import React, { Component } from "react";



class Commentaires extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="messages">
        {this.props.resultat.map((e, key) => (
          <Message
            key={key}
            comment={true}
            setBody={this.props.setBody}
            setPage={this.setPage}
            message={e}
          />
        ))}
      </section>
    );
  }
}

export default Commentaires;
