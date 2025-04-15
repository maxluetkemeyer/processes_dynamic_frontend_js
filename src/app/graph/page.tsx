import { connectToDatabase, createMyLinkList, createMyNodeList, extractSteps, fetchEventLog, fetchEventLogWindows } from "~/_components/graph_renderer/db";
import { GraphRenderer } from "~/_components/graph_renderer/graph_renderer";

export default async function Page() {
  await connectToDatabase();
  const myLog = await fetchEventLog();
  const myWindows = await fetchEventLogWindows();

  // Create nodes and links from the database data
  const nodes = createMyNodeList(myLog);
  const links = createMyLinkList(myLog);
  extractSteps(nodes, links, myWindows);
  const maxSteps = myWindows.length;

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
