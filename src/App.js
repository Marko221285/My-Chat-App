import React from 'react';
import Input from './Input';
import Messages from './Messages';
import {randomName, randomColor} from './RandomFunctions';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      member: {
        username: randomName(),
        color: randomColor()
      }
    }

    this.drone = new window.Scaledrone("JTYvrnbJPazr98QW", {
      data: this.state.member
    });
  }

  componentDidMount() {
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member: member});
    })
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

  render() {
    return (
      <div className='App'>
        <Messages messages={this.state.messages}
                  currentMember={this.state.member} />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    )
  }
}