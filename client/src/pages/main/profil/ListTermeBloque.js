import React, { Component } from 'react'
import TermeBloquer from './TermeBloquer';

export default class ListTermeBloque extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    return <div>
      {this.props.resultat.map((terme,index)=><TermeBloquer key={index} terme={terme}/>)}
      </div>
    
  }
}
