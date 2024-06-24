import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { hexbin as d3Hexbin } from 'd3-hexbin';

const HexBinPlot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data.length === 0) return;

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

    const color = d3.scaleSequential(d3.interpolateYlOrRd)
      .domain([0, d3.max(bins, d => d.length)]);

    svg.append('g')
      .selectAll('path')
      .data(bins)
      .enter().append('path')
      .attr('d', hexbin.hexagon())
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .attr('fill', d => color(d.length))
      .attr('stroke', '#000')
      .attr('stroke-width', '0.1');

    // Add court outline
    svg.append("rect")
      .attr("x", x(-250))
      .attr("y", y(418))
      .attr("width", x(250) - x(-250))
      .attr("height", y(-52) - y(418))
      .attr("fill", "none")
      .attr("stroke", "white");

    // Add three-point line
    const threePointLine = d3.line()
      .x(d => x(d[0]))
      .y(d => y(d[1]));

    const threePointCoords = [
      [-220, -52], [-220, 89.47], [-220, 89.47], 
      [-220, 89.47], [-220, 89.47], [-220, 89.47], 
      [220, 89.47], [220, 89.47], [220, 89.47], 
      [220, 89.47], [220, -52]
    ];

    svg.append("path")
      .attr("d", threePointLine(threePointCoords))
      .attr("fill", "none")
      .attr("stroke", "white");

    // Add free throw circle
    svg.append("circle")
      .attr("cx", x(0))
      .attr("cy", y(157.5))
      .attr("r", x(60) - x(0))
      .attr("fill", "none")
      .attr("stroke", "white");

    // Add backboard
    svg.append("line")
      .attr("x1", x(-30))
      .attr("y1", y(418))
      .attr("x2", x(30))
      .attr("y2", y(418))
      .attr("stroke", "white");

    // Add hoop
    svg.append("circle")
      .attr("cx", x(0))
      .attr("cy", y(418))
      .attr("r", 4)
      .attr("fill", "white");

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default HexBinPlot;
