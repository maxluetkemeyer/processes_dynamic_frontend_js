import { type MyLink, type MyNode } from "./types";

export function calculateLevels(nodes: MyNode[], links: MyLink[]) {
  let changed = false;

  while (!changed) {
    changed = false;

    for (const link of links) {
      // Get the source and target nodes
      const target = link.target;
      const source = link.source;

      // Check if the source and target are valid
      const targetNode = nodes.find((node, _, __) => {
        return node.id === target;
      });
      const sourceNode = nodes.find((node, _, __) => {
        return node.id === source;
      });
      if (!sourceNode || !targetNode) return;

      // Check if the source node's level is greater than the target node's level
      if (sourceNode.level >= targetNode.level) {
        targetNode.level = sourceNode.level + 1;
        changed = true;
      }
    }
  }
}
