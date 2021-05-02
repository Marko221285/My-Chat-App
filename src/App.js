import React from 'react';
import Input from './Input';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      member: {}
    }
  }

  render() {
    return (
      <div>
        <Input />
      </div>
    )
  }
}