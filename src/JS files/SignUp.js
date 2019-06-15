import React from "react";
import TextField from "@material-ui/core/TextField/index";
import Button from "@material-ui/core/Button/index";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FilledInput from "@material-ui/core/FilledInput";
import fire from "./Fire.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router";
import db from "./Fire";
// import CardActions from "@material-ui/core/CardActions";

// import * as firebase from 'firebase'

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      email: "",
      emailInUseError:
        "The email address is already in use by another account.",
      invalidEmailError: "The email address is badly formatted.",
      password: "",
      passwordError: "Password should be at least 6 characters",
      passwordConf: "",
      errorMessage: "",
      name: "",
      surname: "",
      number: "",
      age: "",
      gender: "",
      userId: "",
      user: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.changeRedirect = this.changeRedirect.bind(this);
    // this.addUser = this.addUser.bind(this);
  }

  // addUser = e => {
  //   e.preventDefault();
  //   const db = firebase.firestore();
  //   db.settings({
  //     timestampsInSnapshots: true
  //   });
  //   const userRef = db.collection("users").add({
  //     name: this.state.name,
  //     surname: this.state.surname,
  //     age: this.state.age,
  //     gender: this.state.gender,
  //     number: this.state.number,
  //     email: this.state.email
  //   });
  //   this.setState({
  //     name: "",
  //     surname: "",
  //     age: "",
  //     gender: "",
  //     number: "",
  //     email: ""
  //   });
  //   console.log(userRef)
  // };
  changeRedirect (){
    this.setState({ redirect: true });
  };

  signUp(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(cred => {
        return db
          .collection("users")
          .doc(cred.user.uid)
          .set({
            name: this.state.name,
            surname: this.state.surname,
            age: this.state.age,
            gender: this.state.gender,
            number: this.state.number,
            email: this.state.email
          });
      })
      .catch(error => {
        this.setState({
          errorMessage: error,
          email: this.state.email,
          password: "",
          passwordConf: ""
        });
      });
  }

  handleInputChange = (event, type) => {
    this.setState({
      [type]: event.target.value
    });
  };

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

  render() {
    const {
      redirect,
      email,
      emailInUseError,
      invalidEmailError,
      password,
      passwordError,
      passwordConf,
      errorMessage,
      name,
      surname,
      age,
      gender,
      number,
      user
    } = this.state;
    if (user) {
      return <Redirect to="/my-account" />;
    } else {
      return (
        <form onSubmit={this.signUp}>
          <div>
            <TextField
              id="outlined-email-input"
              label="Name"
              // className={classes.textField}
              type="text"
              name="name"
              autoComplete="name"
              margin="normal"
              variant="outlined"
              onChange={e => this.handleInputChange(e, "name")}
              value={name}
            />
            <TextField
              id="outlined-email-input"
              label="Surname"
              // className={classes.textField}
              type="text"
              name="surname"
              autoComplete="surname"
              margin="normal"
              variant="outlined"
              onChange={e => this.handleInputChange(e, "surname")}
              value={surname}
            />
          </div>
          <div>
            <TextField
                id="date"
                label="Birthday"
                type="date"
                margin="normal"
                defaultValue="2017-05-24"
                onChange={e => this.handleInputChange(e, "age")}
                value={age}
                InputLabelProps={{
                  shrink: true,
                }}
            />
            <FormControl variant="filled">
              <InputLabel htmlFor="filled-age-native-simple">Gender</InputLabel>
              <Select
                native
                value={this.state.gender}
                onChange={e => this.handleInputChange(e, "gender")}
                input={<FilledInput name="gender" />}
              >
                <option value="" />
                <option value={"male"}>Male</option>
                <option value={"female"}>Female</option>
              </Select>
            </FormControl>
          </div>

          <div>
            <TextField
              id="outlined-email-input"
              label="Phone number"
              // className={classes.textField}
              type="text"
              name="number"
              autoComplete="number"
              margin="normal"
              variant="outlined"
              onChange={e => this.handleInputChange(e, "number")}
              value={number}
            />
            <TextField
              error={
                errorMessage.message === emailInUseError ||
                errorMessage.message === invalidEmailError
              }
              id="outlined-email-input"
              label="Email"
              // className={classes.textField}
              type="email"
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
              id="outlined-password-input"
              label="password"
              // className={classes.textField}
              type="password"
              name="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              onChange={e => this.handleInputChange(e, "password")}
              value={password}
            />
            <TextField
              error={password !== passwordConf && passwordConf}
              id="outlined-password-input"
              label="Confirm Password"
              // className={classes.textField}
              type="password"
              name="passwordConf"
              autoComplete="passwordConf"
              margin="normal"
              variant="outlined"
              onChange={e => this.handleInputChange(e, "passwordConf")}
              value={passwordConf}
            />
          </div>
          {errorMessage ? (
            <div>
              <FontAwesomeIcon
                icon="exclamation-circle"
                style={{ color: "red", marginRight: "10px" }}
              />
              <span style={{ color: "red", marginTop: "0px" }}>
                {errorMessage.message}
              </span>
            </div>
          ) : null}
          <Button
            variant="outlined"
            onClick={this.signUp}
            disabled={
              !(
                email &&
                password &&
                gender &&
                age &&
                passwordConf &&
                name &&
                surname &&
                    number &&
                password === passwordConf
              )
            }
            href="#text-buttons"
          >
            Confirm
          </Button>
          <Button variant="outlined" onClick={this.changeRedirect}>Back to Log in</Button>
          {redirect ? <Redirect to="/sign-in" /> : null}
        </form>
      );
    }
  }
}

export default SignUp;
