import React, { Component } from 'react'

import Sandbox from './observer/Sandbox.jsx'

class Panel extends Component {
  constructor (props) {
    super(props)

    this.sandbox = new Sandbox(this)
    this.sandbox.on('button-click', this.changeColor)

    this.state = {
      styles: {
        backgroundColor: props.backgroundColor
      }
    }
  }

  render () {
    return (
      <div style={this.state.styles} />
    )
  }

  changeColor (color) {
    this.setState({
      styles: {
        backgroundColor: color
      }
    })
  }
}

export default Panel
