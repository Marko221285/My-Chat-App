import React from 'react';
import Input from './Input';
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
      console.log(this.state.member);
    })
  }

  render() {
    return (
      <div>
        <Input />
      </div>
    )
  }
}