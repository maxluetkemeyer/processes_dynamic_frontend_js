"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import { getLinks, getNodes } from "./example_data";
import { runGraph } from "./graph";
import { getCurrentLinks, getCurrentNodes } from "./dynamic";

import "~/styles/graph_renderer.css";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { calculateLevels } from "./level";
import { type MyNode } from "./types";

export function GraphRenderer() {
  const svg0 = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState(getNodes());
  const [links, setLinks] = useState(getLinks());
  const [step, setStep] = useState(0);

  useEffect(() => {
    calculateLevels(nodes, links);
    runGraph(svg0, nodes, links, setNodes, setLinks);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svg0]);


  return (
    <div className="w-full">
      <svg ref={svg0} width="100%" height="100%" className="h-11/12 w-full">
        {getCurrentNodes(nodes, step).map((node, index) => (
          <React.Fragment key={"myfragment" + index}>
            <circle
              key={"mynode" + index}
              cx={node.x}
              cy={node.y}
              r={10}
              className="node"
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
            className="link"
            x1={(link.source as MyNode).x}
            y1={(link.source as MyNode).y}
            x2={(link.target as MyNode).x}
            y2={(link.target as MyNode).y}
          />
        ))}
      </svg>
      <GraphTimeLine
        step={step}
        onChange={(e) => setStep(parseInt(e.target.value, 10))}
      />
    </div>
  );
}

export function GraphTimeLine({
  step,
  onChange,
}: {
  step: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Card className="h-1/12 w-full gap-1 bg-gray-100 py-2">
      <CardHeader>
        <CardTitle>Week {step}</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={step}
          onChange={onChange}
          className="w-full"
        />
      </CardContent>
    </Card>
  );
}
