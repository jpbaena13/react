class Main extends React.PureComponent {
	render() {
		return `<h1>HOLA MUNDO!!</h1>`;
	}
}

ReactDOM.render(
	<Main name="Platzi"/>,
	document.getElementById('app')
);