import * as d3 from "d3";
import { type RefObject } from "react";

function calculateLevels(
  nodes: {
    id: string;
    level: number;
  }[],
  links: {
    source: string;
    target: string;
  }[],
) {
  let changed = false;

  while (true) {
    links.forEach((link, _) => {
      const target = link.target;
      const source = link.source;

      const targetNode = nodes.find((node, _, __) => {
        return node.id === target;
      });

      const sourceNode = nodes.find((node, _, __) => {
        return node.id === source;
      });

      if (!sourceNode || !targetNode) return;

      if (sourceNode.level >= targetNode.level) {
        targetNode.level = sourceNode.level + 1;
        changed = true;
      }
    });

    if (!changed) break;
    changed = false;
  }
}

const width = 600,
  height = 500;

function doD3(
  svg0: RefObject<SVGSVGElement>,
  nodes: {
    id: string;
    level: number;
  }[],
  links: {
    source: string;
    target: string;
  }[],
) {
  // Create SVG canvas
  const svg = d3
    .select(svg0.current)
    .attr("width", width)
    .attr("height", height);

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
    .force("y", d3.forceY((d) => d.level * 100).strength(1)) // Force downward
    .on("tick", ticked);

  // Draw links
  const link = svg
    .selectAll(".link")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link");

  // Draw nodes
  const node = svg
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

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    label.attr("x", (d) => d.x).attr("y", (d) => d.y);
  }
}

export function runGraph(svg0: RefObject<SVGSVGElement>) {
  const nodes = [
    { id: "A", level: 0 }, // Start node at the top
    { id: "B", level: 0 },
    { id: "C", level: 0 },
    { id: "D", level: 0 },
  ];
  
  const links = [
    { source: "A", target: "B" },
    { source: "B", target: "C" },
    //{ source: "C", target: "D" },
    { source: "A", target: "D" }, // A can directly follow D too
    { source: "A", target: "C" },
  ];

  calculateLevels(nodes, links);

  doD3(svg0, nodes, links);
  return;
}
