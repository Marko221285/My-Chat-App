import React from 'react';
import Input from './Input';
import Messages from './Messages';
import {randomName, randomColor} from './RandomFunctions';

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
    }, console.log(this.state.member));
  }

  componentDidMount() {
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member: member});
      console.log(this.state.member);
    })
  }

  componentDidUpdate() {
    const room = this.drone.subscribe('observable-room');
    room.on('data', (message, member) => {
      const messages = this.state.messages;
      messages.push({member, text: message});
      this.setState({messages: messages});
      console.log(this.state.messages);
    });
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: 'observable-room',
      message
    }, console.log(this.state.messages));
  }

  render() {
    return (
      <div>
        <Messages messages={this.state.messages}
                  currentMember={this.state.member} />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    )
  }
}