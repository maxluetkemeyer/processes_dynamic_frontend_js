import * as d3 from "d3";
import { type RefObject } from "react";
import { getLinks, getNodes, type MyLink, type MyNode } from "./types";
import { calculateLevels } from "./level";

const width = 600,
  height = 500;

function doD3(
  svg0: RefObject<SVGSVGElement>,
  nodes: MyNode[],
  links: MyLink[],
) {
  // Create SVG canvas
  const svg = d3.select(svg0.current);

  // Force simulation with structured layout
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(100),
    )
    .force("charge", d3.forceManyBody().strength(-300))
    .force("x", d3.forceX(width / 2)) // Center horizontally
    .force("y", d3.forceY((d: MyNode) => d.level * 100).strength(1)) // Force downward
    .on("tick", () => {
      ticked();

    });

  // Draw links
  const link = svg
    .selectAll(".link")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link");

  // Draw nodes
  const svgNodes = svg
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", 10);

  // Add labels
  const label = svg
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("dy", -15)
    .text((d) => d.id);

  // Function to update positions
  function ticked() {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    svgNodes.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    label.attr("x", (d) => d.x).attr("y", (d) => d.y);
  }

  return nodes;
}

export function runGraph(
  svg0: RefObject<SVGSVGElement>,
  nodes: MyNode[],
  links: MyLink[]
) {
  calculateLevels(nodes, links);

  const myNodes = doD3(svg0, nodes, links);
}

export function drawPartial(svg1: RefObject<SVGSVGElement>, nodes: MyNode[]) {
  console.log(nodes)
  for(const node of nodes){
    console.log(node)
  }
  
  
  const svg = d3
    .select(svg1.current)
    .attr("width", width)
    .attr("height", height);

  const svgNodes = svg
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .attr("cx", (d) => {
      return d.x;
    })
    .attr("cy", (d) => d.y);
}
