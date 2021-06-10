import React from 'react';
import Input from './Input';
import Messages from './Messages';
import {randomColor} from './RandomFunctions';
import { Redirect } from "react-router-dom";
import './ChatApp.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      member: {
        username: props.user,
        color: randomColor()
      },
      islogout: false
    };
  }
  
  componentDidMount() {
    this.drone = new window.Scaledrone("JTYvrnbJPazr98QW", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return alert(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member: member});
    });
  }

  componentDidUpdate() {
    const room = this.drone.subscribe('observable-room');
    room.on('data', (message, member) => {
      const messages = this.state.messages;
      messages.push({member, text: message});
      this.setState({messages: messages});
    });
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: 'observable-room',
      message
    });
  }

  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      islogout: true
    });
  }

  render() {
    if (this.state.islogout) {
      return <Redirect to="/login" />;
    }
    return (
      <div className='App'>
        <button className='btn-logoff' onClick={this.signOut}>Sign out</button>
        <Messages messages={this.state.messages}
                  currentMember={this.state.member} />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    )
  }
}