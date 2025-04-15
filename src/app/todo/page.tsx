"use client";

import { useEffect, useRef, useState } from "react";
import { runGraph } from "../_components/graph";
import { getLinks, getNodes } from "../_components/types";
import React from "react";
import { getCurrentLinks, getCurrentNodes } from "../_components/dynamic";

export default function Home() {
  if (typeof window !== "undefined") {
    console.log("window is defined");
  } else {
    console.log("window is not defined");
  }

  const svg0 = useRef<SVGSVGElement>(null);

  const [nodes, setNodes] = useState(getNodes());
  const [links, setLinks] = useState(getLinks());

  const [step, setStep] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => runGraph(svg0, nodes, links, setNodes, setLinks), [svg0]);

  //useEffect(() => drawPartial(svg1, nodes), [svg1, nodes]);
  return (
    <main>
      {/* <p>Full:</p>
      <svg
        ref={svg0}
        width="600"
        height="500"
        style={{ display: "block" }}
      ></svg> */}
      {/* <p>Second:</p> */}

      <svg ref={svg0} width="600" height="500">
        {getCurrentNodes(nodes, step).map((node, index) => (
          <React.Fragment key={"myfragment" + index}>
            <circle
              key={"mynode" + index}
              cx={node.x}
              cy={node.y}
              r={10}
              className={"node"}
            />
            <text
              key={"mytext" + index}
              x={node.x}
              y={node.y - 15}
              textAnchor="middle"
            >
              {node.id}
            </text>
          </React.Fragment>
        ))}
        {getCurrentLinks(links, step).map((link, index) => (
          <line
            key={"myline" + index}
            className={"link"}
            x1={link.source.x}
            y1={link.source.y}
            x2={link.target.x}
            y2={link.target.y}
          />
        ))}
      </svg>
      <div className="flex flex-col items-center p-4">
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={step}
          onChange={(e) => setStep(parseInt(e.target.value, 10))}
          className="w-64"
        />
        <span className="mt-2 text-lg font-semibold">Week: {step}</span>
      </div>
    </main>
  );
}
