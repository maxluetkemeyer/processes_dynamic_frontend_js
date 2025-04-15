import { type MyLink, type MyNode } from "./types";

export function getCurrentNodes(nodes: MyNode[], step: number) {
  let active: string[] = [];

  switch (step) {
    case 0:
      active = ["A", "D"];
      break;
    case 1:
      active = ["A", "B", "C", "D"];
      break;
    case 2:
      active = ["A", "C"];
      break;
    default:
      active = ["A"];
      break;
  }

  const filtered = nodes.filter((node, _, __) => {
    return active.includes(node.id);
  });

  return filtered;
}

export function getCurrentLinks(links: MyLink[], step: number) {
  let active: string[] = [];

  switch (step) {
    case 0:
      active = ["A", "D"];
      break;
    case 1:
      active = ["A", "B", "C", "D"];
      break;
    case 2:
      active = ["A", "C"];
      break;
    default:
      active = ["A"];
      break;
  }

  const filtered = links.filter((link, _, __) => {
    return (
      active.includes((link.source as MyNode).id) &&
      active.includes((link.target as MyNode).id)
    );
  });

  return filtered;
}
