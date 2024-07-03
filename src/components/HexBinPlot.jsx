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

    const svgElement = d3.select(svgRef.current);
    svgElement.selectAll("*").remove();

    const width = svgElement.node().getBoundingClientRect().width;
    const height = svgElement.node().getBoundingClientRect().height;

    const svg = svgElement
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g');

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

    // Add court outline or any other necessary elements here

  }, [data]);

  return <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>;
};

export default HexBinPlot;
