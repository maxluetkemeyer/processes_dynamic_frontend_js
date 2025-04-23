import {
  connectToDatabase,
  createMyLinkList,
  createMyNodeList,
  extractSteps,
  fetchEventLog,
  fetchEventLogWindows,
} from "~/_components/graph_renderer/db";

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
      <h1 className="text-2xl font-bold">Welcome to the Database tests!</h1>
      <p>Number of steps: {maxSteps}</p>
      <p>{myLog.activities}</p>
      {nodes.map((node) => (
        <div key={node.id}>
          <h2>{node.id}</h2>
          <p>Level: {node.level}</p>
          <p>Steps: {node.steps.join(", ")}</p>
          <p>
            Coordinates: ({node.x}, {node.y})
          </p>
        </div>
      ))}

      <h2>Links</h2>
      {links.map((link, index) => (
        <div key={index}>
          <p>
            {link.source} - {link.target}
          </p>
          <p>Weight: {link.weight}</p>
          <p>Steps: {link.steps.join(", ")}</p>
        </div>
      ))}
    </>
  );
}
