import React from "react";
import TextField from "@material-ui/core/TextField/index";
import Button from "@material-ui/core/Button/index";
import fire from "./Fire.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router";
library.add(faExclamationCircle);


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeRedirect = this.changeRedirect.bind(this);
    this.state = {
        redirect: false,
      email: "",
      password: "",
      errorMessage: "",
      emailError1:
        "There is no user record corresponding to this identifier. The user may have been deleted.",
      emailError2: "The email address is badly formatted.",
      passwordError:
        "The password is invalid or the user does not have a password.",
      user: null
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  signIn(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(e => {})
      .catch(error => {
        this.setState({
          errorMessage: error,
          email: this.state.email,
          password: ""
        });
      });
  }

  handleInputChange = (event, type) => {
    this.setState({
      [type]: event.target.value
    });
  };

  changeRedirect (){
      this.setState({ redirect: true });
  };

  render() {
    const {
      redirect,
      email,
      password,
      errorMessage,
      emailError1,
      emailError2,
      passwordError,
      user
    } = this.state;
    if (user) {
      return <Redirect to="/my-account" />;
    } else {
      return (
          <Card >
            <CardContent>
              <Typography  color="textSecondary" gutterBottom>
                Please, log in to enter your personal page
              </Typography>
              <Typography variant="h5" component="h2" className="logIn">
                Log in
              </Typography>
              <div>
                <TextField
                    error={
                      errorMessage.message === emailError1 ||
                      errorMessage.message === emailError2
                    }
                    id="outlined-email-input"
                    label="Email"
                    // className={classes.textField}
                    type="text"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.handleInputChange(e, "email")}
                    value={email}
                />
              </div>
              <div>
                <TextField
                    error={errorMessage.message === passwordError}
                    id="outlined-email-input"
                    label="Password"
                    // className={classes.textField}
                    type="password"
                    name="password"
                    autoComplete="password"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.handleInputChange(e, "password")}
                    value={password}
                />
              </div>
              {errorMessage ? (
                  <div>
                    <FontAwesomeIcon
                        icon="exclamation-circle"
                        style={{ color: "red", marginRight: "10px" }}
                    />
                    <span style={{ color: "red", marginTop: "0px" }}>
                Invalid email or password.
              </span>
                  </div>
              ) : null}
            </CardContent>
            <CardActions>
              <Button
                  type="submit"
                  variant="outlined"
                  // color="grey"
                  onClick={this.signIn}
                  disabled={!(email && password)}
                  href="#text-buttons"
              >
                Sign In
              </Button>
              <Button variant="outlined" onClick={this.changeRedirect}>Register</Button>
                {redirect ? <Redirect to="/sign-up" /> : null}
            </CardActions>
          </Card>
      );
    }
  }
}

export default SignIn;
