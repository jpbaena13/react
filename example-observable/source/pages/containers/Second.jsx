import React, { Component } from 'react';

class Second extends React.Component {
	constructor(props) {
		super(props);

		this.handlerClick = props.onClick.bind(this);
	}

	render() {
		return (
			<div id="second" onClick={this.handlerClick}>Esa es la idea</div>
		);
	}
}

export default Second;