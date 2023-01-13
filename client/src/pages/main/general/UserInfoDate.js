import React from "react";
import UserInfo from "./UserInfo";
const {getDate} = require("./date.js")
class UserInfoDate extends React.Component {
  componentWillReceiveProps(props) {
    this.props = props;
    
  }
  render() {
    if  (!this.props.user) {
      return <div></div>
    }
    let date = getDate(this.props.date)
   
    return (
      <div className="message_user_info">
        <UserInfo user={this.props.user} setPage={this.props.setPage} />
        <p className="message_date">
          {date} 
        </p>
      </div>
    );
  }
}

export default UserInfoDate;
