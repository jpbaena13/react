import React, { Component } from 'react';

class First extends React.Component {
	constructor(props) {
		super(props);

		this.handlerClick = props.onClick.bind(this);
	}

	render() {
		return (
			<div id="first">
				<button onClick={this.handlerClick}>Click me!!</button>
			</div>
		);
	}
}

export default First;