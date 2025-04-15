import { type MyLink, type MyNode } from "./types";

export function calculateLevels(nodes: MyNode[], links: MyLink[]) {
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
