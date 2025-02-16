export interface MyNode extends d3.SimulationNodeDatum {
  id: string;
  level: number;
  x: number;
  y: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MyLink extends d3.SimulationLinkDatum<MyNode> {
  // source: string;
  // target: string
}

export function getNodes() {
  const nodes: MyNode[] = [
    { id: "A", level: 1, x: 0, y: 0 }, // Start node at the top
    { id: "B", level: 0, x: 0, y: 0 },
    { id: "C", level: 0, x: 0, y: 0 },
    { id: "D", level: 0, x: 0, y: 0 },
  ];
  return nodes;
}

export function getLinks() {
  const links: MyLink[] = [
    { source: "A", target: "B" },
    { source: "B", target: "C" },
    { source: "C", target: "D" },
    { source: "A", target: "D" }, // A can directly follow D too
    { source: "A", target: "C" },
  ];
  return links;
}