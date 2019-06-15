import React from "react";
// import Button from "@material-ui/core/Button";
import SignUp from "./JS files/SignUp";
import SignIn from "./JS files/SignIn";
import MyAccount from "./JS files/MyAccount";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./contents/main";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: false,
      signUp: false
    };
  }

  render() {
    return (
      <Router>
        <div>
          <Link to="/"></Link>

          <Route path="/" exact component={Home} />
          <Route path="/my-account" component={MyAccount} />
          <Route path="/sign-in/" component={SignIn} />
          <Route path="/sign-up/" component={SignUp} />
        </div>
      </Router>     
    );
  }
}

export default App;
