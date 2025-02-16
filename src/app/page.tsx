"use client";

import { useEffect, useRef } from "react";
import { runGraph } from "./_components/graph";

export default function Home() {
  const svg0 = useRef<SVGSVGElement>(null), svg1 = useRef<SVGSVGElement>(null);

  useEffect(() => runGraph(svg0), [svg0]);

  return (
    <main>
      <h1>Full</h1>
      <svg ref={svg0} width="600" height="500"></svg>
      <p>Second:</p>
      <svg ref={svg1} width="600" height="500"></svg>
    </main>
  );
}
