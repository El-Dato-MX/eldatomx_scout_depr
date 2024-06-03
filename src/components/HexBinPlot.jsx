import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { csv } from 'd3-fetch';
import { hexbin } from 'd3-hexbin';

const HexBinPlot = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, width]).range([0, width]);
    const y = d3.scaleLinear().domain([0, height]).range([height, 0]);

    const color = d3.scaleSequential(d3.interpolateBuGn).domain([0, 20]);

    csv('/src/assets/shotchartd.csv').then((data) => {
      console.log('Data loaded:', data);
      const points = data.map(d => [parseFloat(d.LOC_X), parseFloat(d.LOC_Y)]);
      console.log('Points:', points);

      const hex = hexbin()
        .x(d => x(d[0]))
        .y(d => y(d[1]))
        .radius(20)
        .extent([[0, 0], [width, height]]);

      const bins = hex(points);
      console.log('Bins:', bins);

      svg
        .append('g')
        .selectAll('path')
        .data(bins)
        .enter()
        .append('path')
        .attr('d', hex.hexagon())
        .attr('transform', d => `translate(${d.x},${d.y})`)
        .attr('fill', d => color(d.length))
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('opacity', 0.6);
    }).catch(error => {
      console.error('Error loading data:', error);
    });
  }, []);

  return <svg ref={svgRef} style={{ border: '1px solid black' }}></svg>;
};

export default HexBinPlot;

