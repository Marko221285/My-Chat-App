import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogged: false,
      loginParams: {
        user_id: "",
        user_password: ""
      }
    };
  }

  handleFormChange = event => {
    let loginParamsNew = { ...this.state.loginParams };
    let val = event.target.value;
    loginParamsNew[event.target.name] = val;
    this.setState({
      loginParams: loginParamsNew
    });
  }
 
  login = event => {
    event.preventDefault();
    let user_id = this.state.loginParams.user_id;
    let user_password = this.state.loginParams.user_password;
    if (user_id && user_password === "123") {
      localStorage.setItem("token", "T");
      this.setState({
        islogged: true
      });
      this.props.onSignUser(user_id);
    }
  }

  render() {
    if (localStorage.getItem("token", "T")) {
      return <Redirect to="/chatapp" />;
    }
    return (
      <div className="container">
        <form onSubmit={this.login}>
          <h2>Please sign in</h2>          
          <div className="inp-div">
            <input className="inp-login"
              type="text"
              name="user_id"
              onChange={this.handleFormChange}
              placeholder="Enter Username"
            />
            <input className="inp-login"
              type="password"
              name="user_password"
              onChange={this.handleFormChange}
              placeholder="Enter Password"
            />
            <input className="inp-login" type="submit" value="Login" />
          </div>          
        </form>
      </div>
    );
  }
}
export default Login;