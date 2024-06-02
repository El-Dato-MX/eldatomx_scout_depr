import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { hexbin as d3Hexbin } from 'd3-hexbin';

const HexBinPlot = () => {
  const svgRef = useRef();

  useEffect(() => {
    // Set the dimensions and margins of the graph
    const margin = { top: 20, right: 20, bottom: 30, left: 40 },
          width = 800 - margin.left - margin.right,
          height = 600 - margin.top - margin.bottom;

    // Load the CSV file
    d3.csv('/shotchartd.csv').then(data => {
      // Process the data to extract the necessary fields
      const processedData = data.map(d => [parseFloat(d.x), parseFloat(d.y)]);
      console.log('Processed Data:', processedData);

      // Clear any previous SVG content
      d3.select(svgRef.current).selectAll('*').remove();

      // Append the svg object to the div
      const svg = d3.select(svgRef.current)
        .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

      // Initialize the hexbin generator
      const hexbin = d3Hexbin()
        .radius(20)
        .extent([[0, 0], [width, height]]);

      // Compute the hexbin data
      const bins = hexbin(processedData);
      console.log('Hexbin Bins:', bins);

      // Add color scale
      const color = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, d3.max(bins, d => d.length)]);

      // Draw the hexagons
      svg.append('g')
        .selectAll('path')
        .data(bins)
        .enter().append('path')
          .attr('d', hexbin.hexagon())
          .attr('transform', d => `translate(${d.x},${d.y})`)
          .attr('fill', d => color(d.length))
          .attr('stroke', 'black')
          .attr('stroke-width', 1);
    }).catch(error => {
      console.error('Error loading or processing CSV file:', error);
    });
  }, []);

  return <div ref={svgRef}></div>;
};

export default HexBinPlot;

