import React, { Component } from 'react'

class DragComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      left: props.left || 0,
      right: props.right || 0,
      text: props.text
    }
  }
  render () {
    return (
      <div>{this.state.text}</div>
    )
  }
}

export default DragComponent
