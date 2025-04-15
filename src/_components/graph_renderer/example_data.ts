import { type MyLink, type MyNode } from "./types";

export function getNodes() {
  const nodes: MyNode[] = [
    { id: "A", level: 1, x: 0, y: 0, steps: [0, 1, 2] }, // Start node at the top
    { id: "B", level: 0, x: 0, y: 0, steps: [1] },
    { id: "C", level: 0, x: 0, y: 0, steps: [1, 2] },
    { id: "D", level: 0, x: 0, y: 0, steps: [0, 1] },
  ];
  return nodes;
}

export function getLinks() {
  const links: MyLink[] = [
    { source: "A", target: "B", steps: [1] },
    { source: "B", target: "C", steps: [1] },
    { source: "C", target: "D", steps: [1] },
    { source: "A", target: "D", steps: [0, 1] }, // D can directly follow A too
    { source: "A", target: "C", steps: [1, 2] },
  ];
  return links;
}
