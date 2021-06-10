import React from 'react';
import Login from "./Login";
import ChatApp from "./ChatApp";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };
  }

  onSignUser = (newuser) => {
    this.setState({username: newuser});
  }
    
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <Login onSignUser={this.onSignUser} />
          </Route>
          <ProtectedRoute path="/chatapp" >
            <ChatApp user={this.state.username}/>
          </ProtectedRoute>
          <Route exact path="/">
            <Redirect exact from="/" to="chatapp" />
          </Route>
          <Route path="*">
            <Redirect from="/" to="chatapp" />
          </Route>
        </Switch>
      </Router>
    );
  }
}
  