import React, { Component } from 'react'

import Sandbox from './observer/Sandbox.jsx'

class Button extends Component {
  constructor (props) {
    super(props)
    this.sandbox = new Sandbox(this)

    this.state = {
      // onClick: props.onClick
    }

    this.handleClick = this.handleClick.bind(this)
  }

  render () {
    return (
      <div onClick={this.handleClick} />
    )
  }

  handleClick () {
    this.sandbox.emit('button-click', 'green')
    // this.state.onClick('green')
  }
}

export default Button
