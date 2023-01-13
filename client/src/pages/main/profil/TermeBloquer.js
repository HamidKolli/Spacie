import React, { Component } from 'react'

export default class TermeBloquer extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
      <div>{this.props.terme}</div>
    )
  }
}
