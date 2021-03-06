import React, { Component } from 'react';
import { render } from 'react-dom';


import { scaleOrdinal } from 'd3-scale';
import { arc as d3Arc, pie as d3Pie } from 'd3-shape';
import { csvParse } from 'd3-dsv';

import dataCsv from './data';

import './chart.css';

const width = 960,
  height = 500,
  radius = Math.min(width, height) / 2;

const color = scaleOrdinal().range([
  '#98abc5',
  '#8a89a6',
  '#7b6888',
  '#6b486b',
  '#a05d56',
  '#d0743c',
  '#ff8c00',
]);

const data;
const arc;
class App extends Component {
  
  constructor() {
    super();
    this.state = {
      name: 'React',
      data:[]
    };
  }

  componentDidMount(){
    this.drawChart();
  }

  drawChart(){
    arc = d3Arc()
  .outerRadius(radius - 10)
  .innerRadius(radius - 70);const pie = d3Pie()
  .sort(null)
  .value(function(d) {
    return d.population;
  });

  this.setState({'data': pie(
    csvParse(dataCsv, d => {
      d.population = +d.population;
      return d;
    })
  )})
       

  }

    

  render() {
    if (this.state.data === undefined){
      return <div>Loading.... </div>
    }else{
    return (
      <svg width={width} height={height}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {this.state.data.map(d => (
          <g className="arc" key={`a${d.data.age}`}>
            <path d={arc(d)} fill={color(d.data.age)} />
            <text transform={`translate(${arc.centroid(d)})`} dy=".35em">
              {d.data.age}
            </text>
          </g>
        ))}
      </g>
    </svg>
    );
    }
  }
}

render(<App />, document.getElementById('root'));
