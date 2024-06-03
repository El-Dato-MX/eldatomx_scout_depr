import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { csv } from 'd3-fetch';
import { hexbin } from 'd3-hexbin';

const HexBinPlot = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 600; // Reduced width
    const height = 500; // Reduced height
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    csv('/src/assets/shotchartd.csv').then((data) => {
      console.log('Data loaded:', data);
      const points = data.map(d => [parseFloat(d.LOC_X), parseFloat(d.LOC_Y)]);
      console.log('Points:', points);

      const x = d3.scaleLinear()
        .domain(d3.extent(points, d => d[0]))
        .nice() // Adds padding to the domain
        .range([0, plotWidth]);

      const y = d3.scaleLinear()
        .domain(d3.extent(points, d => d[1]))
        .nice() // Adds padding to the domain
        .range([plotHeight, 0]);

      const color = d3.scaleSequential(d3.interpolateBuGn).domain([0, 20]);

      const hex = hexbin()
        .x(d => x(d[0]))
        .y(d => y(d[1]))
        .radius(15) // Reduced radius for smaller plot
        .extent([[0, 0], [plotWidth, plotHeight]]);

      const bins = hex(points);
      console.log('Bins:', bins);

      g.append('g')
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

      // Draw the basketball court
      const courtWidth = plotWidth;
      const courtHeight = plotHeight;
      const court = g.append('g').attr('class', 'court');

      // Outer lines
      court.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', courtWidth)
        .attr('height', courtHeight)
        .attr('fill', 'none')
        .attr('stroke', 'black');

      // Center circle
      court.append('circle')
        .attr('cx', courtWidth / 2)
        .attr('cy', courtHeight / 2)
        .attr('r', 60)
        .attr('fill', 'none')
        .attr('stroke', 'black');

      // Three-point line
      court.append('path')
        .attr('d', d3.arc()
          .innerRadius(240)
          .outerRadius(240)
          .startAngle(Math.PI / 6)
          .endAngle(5 * Math.PI / 6)
        )
        .attr('transform', `translate(${courtWidth / 2},${courtHeight})`)
        .attr('fill', 'none')
        .attr('stroke', 'black');

      // Free throw lane
      court.append('rect')
        .attr('x', courtWidth / 2 - 80)
        .attr('y', courtHeight - 190)
        .attr('width', 160)
        .attr('height', 190)
        .attr('fill', 'none')
        .attr('stroke', 'black');

      // Free throw arc
      court.append('path')
        .attr('d', d3.arc()
          .innerRadius(60)
          .outerRadius(60)
          .startAngle(-Math.PI / 2)
          .endAngle(Math.PI / 2)
        )
        .attr('transform', `translate(${courtWidth / 2},${courtHeight - 190})`)
        .attr('fill', 'none')
        .attr('stroke', 'black');
    }).catch(error => {
      console.error('Error loading data:', error);
    });
  }, []);

  return <svg ref={svgRef} style={{ border: '1px solid black' }}></svg>;
};

export default HexBinPlot;

