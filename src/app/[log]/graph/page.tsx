import {
  connectToDatabase,
  createMyLinkList,
  createMyNodeList,
  extractSteps,
  fetchEventLog,
  fetchEventLogWindows,
} from "~/_components/graph_renderer/db";
import { GraphRenderer } from "~/_components/graph_renderer/graph_renderer";
import { calculateLevels } from "~/_components/graph_renderer/level";

export default async function Page({
  params,
}: {
  params: Promise<{ log: string }>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { log } = await params;

  await connectToDatabase();
  const myLog = await fetchEventLog();
  const myWindows = await fetchEventLogWindows();

  // Create nodes and links from the database data
  const nodes = createMyNodeList(myLog);
  const links = createMyLinkList(myLog);
  extractSteps(nodes, links, myWindows);
  calculateLevels(nodes, links);
  const maxSteps = myWindows.length;

  console.log(nodes.map((node) => [node.id, node.level]));

  return (
    <>
      <div className="flex h-full w-full">
        <GraphRenderer
          nodesParam={nodes}
          linksParam={links}
          maxSteps={maxSteps}
        />
      </div>
    </>
  );
}
