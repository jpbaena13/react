import React, { Component } from 'react'
import { render } from 'react-dom'

import Sandbox from './observer/Sandbox.jsx'

import Button from './Button.jsx'
import Panel from './Panel.jsx'

class App extends Component {
  constructor (props) {
    super(props)
    this.sandbox = new Sandbox(this)

    this.sandbox.on('button-click', this.handleClick)

    this.state = {
      backgroundColor: 'red',
      text: 'Primero'
    }

    this.handleClick = this.handleClick.bind(this)
  }

  render () {
    return (
      <div>
        {this.state.text} <br />
        {this.state.backgroundColor}
        <Button /> {/* onClick={this.handleClick} */}
        <Panel backgroundColor={this.state.backgroundColor} /> {/* ref={(foo) => { this.foo = foo }} */}
      </div>
    )
  }

  handleClick (color) {
    this.setState({
      backgroundColor: 'blue',
      text: 'Segundo'
    })

    // this.foo.changeColor(color)
  }
}

render(
  <App />,
  document.getElementById('app')
)
