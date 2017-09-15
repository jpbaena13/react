import React from 'react';

function Layout(props) {
	return(
		<html>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"/>
				<title>{props.title}</title>
				<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"/>
				<link rel="stylesheet" href="http://localhost:3001/styles.css"/>
			</head>
			<body>
				<div 
					id="render-target"
					dangerouslySetInnerHTML={{
						__html: props.content
					}}
				></div>
				<script type="text/javascript" src="http://localhost:3001/app.js"></script>
			</body>
		</html>
	);
}

export default Layout;