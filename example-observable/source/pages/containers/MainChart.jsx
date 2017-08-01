import React, { Component } from 'react';
import * as d3 from 'd3';

class MainChar extends Component {
	
	/**
	 * Constructor de clase
	 */
	constructor(props) {
		super(props);

		this.state = {}
	}

	componentDidMount() {
		var container = d3.select('#container')
			,color = d3.scaleOrdinal(['#D0D0D0','#533573','#1E285B','#0057A5',
									'#0091D8','#2DB8D5','#88CAB8','#25988A',
									'#2D9F33','#86BD37','#F5EE92','#F7E826',
									'#F49817'])
			,pie = d3.pie().value(function(d){ return d.first ? 2 : 1})
						 .startAngle(-Math.PI/13)
						 .endAngle(-Math.PI/13 + 2*Math.PI)
						 .padAngle(.02)
						 .sort(null);
		
		drivers[0].first = true;

		// Ordenanado sectores por longitud de nombre
		sectors.sort(function(a, b){ return a.name.length - b.name.length });
		
		// Pintando Sectores y Drivers
		sectors.forEach(function(sector, i) {
			var path = d3.arc().outerRadius(120 + 25*i).innerRadius(110 + 25*i);

			var arcSector = container.append('g')
									 .attr('class', 'sector sector_' + sector.id);

			var arcDriver = arcSector.selectAll('g')
						 .data(pie(drivers)).enter()
						 .append('g')
						 	.attr('class', function(d){ return 'driver driver_' + d.data.id });

			arcDriver.append('path')
				.attr('d', path)
				.attr('class', 'driver_path')
				.attr('fill', function(d) { return (d.data.first || Math.random()*10 > 6) ? 'transparent' : color(sector.id) })
				.attr('fill-opacity', '0.3')
				.style('cursor', 'pointer')
				.each(function(d, i) {
					if (!d.data.first) return;

					var firstArcSection = /(^.+?)L/;
                    var newArc = firstArcSection.exec( d3.select(this).attr('d') )[1];
                    newArc = newArc.replace(/,/g, " ");

                    d3.select(this.parentNode).append('path')
                        .attr('id', function(d) { return 'path_sector_' + sector.id })
                        .attr('d', newArc)
                        .style('fill', 'none');
				})
				.on('mouseover', function(d, idx, objs){
					objs.forEach(function(path){
						path.style.fillOpacity = 1
					});
					d3.select('.sector_' + sector.id + ' .driver_0 text').style('fill', color(sector.id))
				}).
				on('mouseout', function(d, idx, objs){
					objs.forEach(function(path){
						path.style.fillOpacity = 0.3
					});

					d3.select('.sector_' + sector.id + ' .driver_0 text').style('fill', 'white')
				})
				.on('click', function(){
					d3.selectAll('.sector')
						.transition()
						.duration(1000)
						.attr('transform', function(d){
							var rot = Math.random()*270;
							var sig = Math.random() > 0.5 ? 1 : -1;
							return 'rotate(' + sig + rot + ')';
						})
						.style('opacity', 0)

				});

			arcDriver
				.filter(function(d){ return d.data.first })
				.append('text')
					.attr('dy', 8)
					.attr('font-size', '10px')
					.attr('fill', 'white')
					.append('textPath')
						.attr('text-anchor', 'middle')
						.attr('startOffset', '50%')
						.attr('xlink:href', function(d){ return '#path_sector_' + sector.id })
						.text(sector.name.toUpperCase());
		});
	}

	render() {
		return (
			<g id="main-char"></g>
		);
	}
}

export default MainChar;