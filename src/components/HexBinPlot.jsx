import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { hexbin as d3Hexbin } from 'd3-hexbin';

const HexbinPlot = () => {
  const svgRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the CSV file
    d3.csv('src/assets/shotchartd.csv').then(loadedData => {
      console.log('Loaded Data:', loadedData); // Debugging line
      const shotData = loadedData.map(d => ({
        locX: +d.LOC_X,
        locY: +d.LOC_Y,
      }));
      console.log('Parsed Shot Data:', shotData); // Debugging line
      setData(shotData);
    }).catch(error => {
      console.error('Error loading CSV:', error); // Debugging line
    });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([-250, 250])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([-50, 450])
      .range([height, 0]);

    const hexbin = d3Hexbin()
      .x(d => x(d.locX))
      .y(d => y(d.locY))
      .radius(20)
      .extent([[0, 0], [width, height]]);

    const bins = hexbin(data);
    console.log('Hexbin Bins:', bins); // Debugging line

    const color = d3.scaleSequential(d3.interpolateBuGn)
      .domain([0, d3.max(bins, d => d.length)]);

    svg.append('g')
      .selectAll('.hexagon')
      .data(bins)
      .enter().append('path')
      .attr('class', 'hexagon')
      .attr('d', hexbin.hexagon())
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .attr('fill', d => color(d.length))
      .attr('stroke', 'white')
      .attr('stroke-width', '1px');

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default HexbinPlot;

