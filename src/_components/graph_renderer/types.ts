export interface MyNode extends d3.SimulationNodeDatum {
  id: string;
  level: number;
  x: number;
  y: number;
}

export type MyLink = d3.SimulationLinkDatum<MyNode>;
