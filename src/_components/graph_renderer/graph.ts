import * as d3 from "d3";
import { type Dispatch, type SetStateAction, type RefObject } from "react";
import { type MyLink, type MyNode } from "./types";

/// Runs the D3 simulation and renders the graph
export function runGraph(
  svg0: RefObject<SVGSVGElement | null>,
  nodes: MyNode[],
  links: MyLink[],
  setNodes: Dispatch<SetStateAction<MyNode[]>>,
  setLinks: Dispatch<SetStateAction<MyLink[]>>,
) {
  if (svg0.current === null) return;

  doD3(svg0.current, nodes, links, setNodes, setLinks);
}

function doD3(
  svgElement: SVGSVGElement,
  nodes: MyNode[],
  links: MyLink[],
  setNodes: Dispatch<SetStateAction<MyNode[]>>,
  setLinks: Dispatch<SetStateAction<MyLink[]>>,
) {
  const width = svgElement.getBoundingClientRect().width;
  const svg = d3.select(svgElement);

  // Force simulation with structured layout
  d3.forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => (d as MyNode).id)
        .distance(300),
    )
    .force("charge", d3.forceManyBody().strength(-1000)) // Increase repulsion
    .force("collision", d3.forceCollide().radius(50)) // Add collision detection
    .force("x", d3.forceX(width / 2)) // Center horizontally
    .force("y", d3.forceY((d: MyNode) => d.level * 150).strength(1.8)) // Force downward
    .on("tick", () => {
      ticked();
    })
    .on("end", () => {
      setNodes([...nodes]);
      setLinks([...links]);
    });

  // Draw links
  const link = svg
    .selectAll(".link")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link"); // link my-disabled

  // Draw nodes
  const svgNodes = svg
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", "node") // node my-disabled
    .attr("r", 10);

  // Add labels
  // const label = svg
  //   .selectAll("text")
  //   .data(nodes)
  //   .enter()
  //   .append("text")
  //   .attr("dy", -15)
  //   .text((d) => d.id);

  // Function to update positions
  function ticked() {
    link
      .attr("x1", (d) => (d.source as MyNode).x)
      .attr("y1", (d) => (d.source as MyNode).y)
      .attr("x2", (d) => (d.target as MyNode).x)
      .attr("y2", (d) => (d.target as MyNode).y);

    svgNodes.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    //label.attr("x", (d) => d.x).attr("y", (d) => d.y);
  }
}
