"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import { runGraph } from "./graph";

import "~/styles/graph_renderer.css";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type MyLink, type MyNode } from "./types";

export function GraphRenderer({
  nodesParam,
  linksParam,
  maxSteps,
}: {
  nodesParam: MyNode[];
  linksParam: MyLink[];
  maxSteps: number;
}) {
  const svg0 = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState(nodesParam);
  const [links, setLinks] = useState(linksParam);
  const [step, setStep] = useState(0);

  useEffect(() => {
    //calculateLevels(nodes, links);
    runGraph(svg0, nodes, links, setNodes, setLinks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svg0]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setStep((prevStep) => (prevStep + 0.1 > maxSteps ? 0 : prevStep + 0.1));
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, [maxSteps]);

  return (
    <div className="w-full">
      <svg ref={svg0} width="100%" height="100%" className="h-11/12 w-full">
        <defs>
          {/* A marker to be used as an arrowhead */}
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="20"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path
              d="M 0 0 L 10 5 L 0 10 z"
              stroke="context-stroke"
              fill="context-fill"
            />
          </marker>
        </defs>

        {links.map((link, index) => (
          <line
            key={"myline" + index}
            className="link"
            x1={(link.source as MyNode).x}
            y1={(link.source as MyNode).y}
            x2={(link.target as MyNode).x}
            y2={(link.target as MyNode).y}
            style={{
              opacity: Math.max(0, detectProximity(link.steps, step)),
            }}
            markerEnd="url(#arrow)"
          />
        ))}
        {nodes.map((node, index) => (
          <React.Fragment key={"myfragment" + index}>
            <circle
              key={"mynode" + index}
              cx={node.x}
              cy={node.y}
              r={10}
              className="node"
              style={{
                opacity: Math.max(0, detectProximity(node.steps, step)),
              }}
            />
            <text
              key={"mytext" + index}
              x={node.x}
              y={node.y - 15}
              textAnchor="middle"
              style={{
                opacity: Math.max(0, detectProximity(node.steps, step)),
              }}
            >
              {node.id}
            </text>
          </React.Fragment>
        ))}
      </svg>
      <GraphTimeLine
        step={step}
        onChange={(e) => setStep(parseFloat(e.target.value))}
        maxSteps={maxSteps}
        onIntervalChange={(myStep) => setStep(myStep)}
      />
    </div>
  );
}

export function GraphTimeLine({
  step,
  onChange,
  maxSteps,
}: {
  step: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxSteps: number;
  onIntervalChange: (step: number) => void;
}) {
  return (
    <Card className="h-1/12 w-full gap-1 bg-gray-100 py-2">
      <CardHeader>
        <CardTitle>Step {step}</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <input
          type="range"
          min={0}
          max={maxSteps}
          step={0.1}
          value={step}
          onChange={onChange}
          className="w-full"
        />
      </CardContent>
    </Card>
  );
}

/**
 * Checks proximity between controller value and array elements
 * @param numbers - Integer array (0-50)
 * @param controller - Control value (0.0-50.0)
 * @param tolerance - Detection threshold (default 1.0)
 *
 * @returns Proximity value (0.0-1.0)
 */
function detectProximity(
  numbers: number[],
  controller: number,
  tolerance = 1.0,
): number {
  // Validation checks
  if (!numbers.every((n) => Number.isInteger(n) && n >= 0 && n <= 50)) {
    throw new Error("Array contains invalid integers");
  }

  if (controller < 0 || controller > 50) {
    throw new RangeError("Controller value out of bounds");
  }

  let distance = Infinity;
  // Proximity detection
  numbers.forEach((num) => {
    const difference = Math.abs(controller - num);
    if (difference > tolerance) return;
    distance = Math.min(distance, difference);
  });

  return 1 - distance / tolerance;
}
