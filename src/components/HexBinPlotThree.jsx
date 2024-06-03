import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { csv } from 'd3-fetch';
import { hexbin } from 'd3-hexbin';

const HexBinPlot = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 500; // Adjust width as needed
    const height = 470; // Adjust height as needed
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    csv('/src/assets/shotchartd.csv').then((data) => {
      const points = data.map(d => [parseFloat(d.LOC_X), parseFloat(d.LOC_Y)]);

      const x = d3.scaleLinear()
        .domain([-250, 250]) // Adjust domain based on your data
        .range([0, plotWidth]);

      const y = d3.scaleLinear()
        .domain([-47.5, 422.5]) // Adjust domain based on your data
        .range([plotHeight, 0]);

      const color = d3.scaleSequential(d3.interpolateBuGn).domain([0, 20]);

      const hex = hexbin()
        .x(d => x(d[0]))
        .y(d => y(d[1]))
        .radius(12) // Adjust radius as needed
        .extent([[0, 0], [plotWidth, plotHeight]]);

      const bins = hex(points);

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

      // Draw basketball court
      const court = g.append('g').attr('class', 'court');

      // Draw the outer lines
      court.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', plotWidth)
        .attr('height', plotHeight)
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-width', 2.6);

      // Free throw lanes and three-point arcs
      court.append('path')
        .attr('d', `
          M0,0 v140
          M470,0 v140
          M170,0 v190
          M330,0 v190
          M190,0 v190
          M310,0 v190
          M170,190 h160
          M280,40 h-60
          M250,40 v2.5
          M290,40 v10
          M210,40 v10
          M250,42.5 a7.5,7.5 0 1,1 -15,0 a7.5,7.5 0 1,1 15,0
          M30,0 v140
          M470,0 v140
          M140,0 v5
          M359.9,0 v5
          M470,281.6 h30
          M0,286.7 h30
          M470,139.9 h30
          M0,140 h30
          M469.8,139.9 a250,250 0 1,1 -469.6,0
        `)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 2.6)
        .style('stroke-linecap', 'round');

      // Draw other key elements
      court.append('path')
        .attr('d', `
          M250,0 v190
          M330,190 H170
          M250,410 a60,60 0 1,1 60,60 h-40 a20,20 0 1,0 -40,0 h-40 a60,60 0 1,1 60-60z
          M250,450 a20,20 0 1,0 20,20 h-40 a20,20 0 1,0 20-20z
          M310,190 a60,60 0 1,0 -60,60 a60,60 0 1,0 60-60z
          M310,190 a60,60 0 1,1 -60-60 a60,60 0 1,1 60,60z
          M290,50 a40,40 0 1,1 -80,0 a40,40 0 1,1 80,0z
        `)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 2.6)
        .style('stroke-linecap', 'round');

      // Draw basket circle and free throw line
      court.append('path')
        .attr('d', `
          M250,42.5 a7.5,7.5 0 1,0 15,0 a7.5,7.5 0 1,0 -15,0
          M170,69.8 h-10
          M170,79.9 h-10
          M170,109.9 h-10
          M170,140 h-10
          M340,69.8 h-10
          M340,79.9 h-10
          M340,109.9 h-10
          M340,140 h-10
        `)
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-width', 2.6)
        .style('stroke-linecap', 'round');

    }).catch(error => {
      console.error('Error loading data:', error);
    });
  }, []);

  return <svg ref={svgRef} style={{ border: '1px solid black' }}></svg>;
};

export default HexBinPlot;

