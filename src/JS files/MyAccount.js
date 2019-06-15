import React, { Component } from "react";
import fire from "./Fire";
import Avatar from "@material-ui/core/Avatar";
import { Redirect } from "react-router";
// import {addUser} from './SignUp'

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.logout = this.logout.bind(this);
  }

  logout() {
    fire.auth().signOut();
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    return (
      <div>
        <Avatar>OP</Avatar>
        <button onClick={this.logout}>Logout</button>
        {redirect ? <Redirect to="/" /> : null}
      </div>
    );
  }
}

export default MyAccount;
