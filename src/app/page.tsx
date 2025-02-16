"use client";

import { useEffect, useRef, useState } from "react";
import { drawPartial, runGraph } from "./_components/graph";
import { getLinks, getNodes } from "./_components/types";

export default function Home() {
  const svg0 = useRef<SVGSVGElement>(null), svg1 = useRef<SVGSVGElement>(null);

  const [nodes, setNodes] = useState(getNodes())
  const [links, setLinks] = useState(getLinks())

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => runGraph(svg0, nodes, links), [svg0, nodes]);

  //useEffect(() => drawPartial(svg1, nodes), [svg1, nodes]);

  return (
    <main>
      <h1>Full:</h1>
      <svg ref={svg0} width="600" height="500"></svg>
      <h1>Second:</h1>

      <svg width="600" height="500">
        {nodes.map((node, index) => (
          <circle
            key={"mynode"+index}
            cx={node.x}
            cy={node.y}
            r={10}
            className={"node"}
          />
        ))}
      </svg>
    </main>
  );
}
