import React, { Component } from 'react';

import First from './First.jsx';
import Second from './Second.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			on: true
		}
	}

	render() {
		return (
			<main role="application">
				<First onClick={this.handlerClick} />
				<Second onClick={this.handlerClick}/>
			</main>
		);
	}

	handlerClick() {
		console.log(this)
	}
}

export default App;