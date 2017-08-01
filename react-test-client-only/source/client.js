import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home.jsx';

function Pages() {
	return(
		<main role="application">
			<Switch>
				<Route
					path="index.html"
					component={Home}>
				</Route>
			</Switch>
		</main>
	);
}

render(
	<BrowserRouter>
		<Pages />
	</BrowserRouter>,
	document.getElementById('render-target')
);