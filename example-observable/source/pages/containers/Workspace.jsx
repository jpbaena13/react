import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

import MainChart from './MainChart.jsx'

class Workspace extends Component {

	/**
	 * Constructor de clase
	 */
	constructor(props) {
		super(props);
		
		this.state = {}
	}

	/**
	 * Añadir las capacidades de drop y zoom al componente
	 */
	componentDidMount(props) {
		var svg = d3.select(ReactDOM.findDOMNode(this))

			,events = {
				zoomed: function() {
					container.attr("transform", d3.event.transform);
				}
			}

			,zoom = d3.zoom()
					   .scaleExtent([0.1, 20])
					   .on('zoom', events.zoomed)

			,panel = svg.select('#panel').call(zoom)
			,rect = panel.select('rect')
			,container = panel.select('g#container');

		d3.select(window).on('resize', function() {
			rect.attr('width', window.innerWidth)
				 	  .attr('height', window.innerHeight);
		});

		var width = panel.node().getBBox().width,
			height = panel.node().getBBox().height;

			panel.call(zoom.transform,
					d3.zoomIdentity.translate(width/2, height/2));

		this.setState({
			panel: panel,
			container: container,
		});
	}

	/**
	 * Render del componente
	 * 
	 * @return HTML
	 */
	render() {
		return (
			<svg id="workspace">
				<g id="panel">
					<rect className="rect"></rect>
					<g id="container">
						<MainChart />
					</g>
				</g>
			</svg>
		)
	}
}

export default Workspace;