import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { hexbin as d3Hexbin } from 'd3-hexbin';

const HexBinPlot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    console.log('HexBinPlot data:', data);
    if (!data || data.length === 0) {
      console.log('No data for HexBinPlot');
      return;
    }

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 470 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([-250, 250])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([-52, 418])
      .range([height, 0]);

    const hexbin = d3Hexbin()
      .x(d => x(d.LOC_X))
      .y(d => y(d.LOC_Y))
      .radius(10)
      .extent([[0, 0], [width, height]]);

    const bins = hexbin(data);
    console.log('Hexbin bins:', bins);

    const color = d3.scaleSequential(d3.interpolateYlOrRd)
      .domain([0, d3.max(bins, d => d.length) || 1]);

    svg.append('g')
      .selectAll('path')
      .data(bins)
      .enter().append('path')
      .attr('d', hexbin.hexagon())
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .attr('fill', d => color(d.length))
      .attr('stroke', '#000')
      .attr('stroke-width', '0.1');

    // ... (rest of the code remains the same)

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default HexBinPlot;
