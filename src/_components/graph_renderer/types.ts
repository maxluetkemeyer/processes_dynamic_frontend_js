export interface MyNode extends d3.SimulationNodeDatum {
  id: string;
  level: number;
  x: number;
  y: number;
  steps: number[];
}

export interface MyLink extends d3.SimulationLinkDatum<MyNode> {
  steps: number[];
}
