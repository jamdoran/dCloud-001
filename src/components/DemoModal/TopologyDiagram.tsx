import type { CSSProperties } from "react";
import styles from "./TopologyDiagram.module.css";

/** Deterministic pseudo-random from a string seed. */
function seeded(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  let state = Math.abs(h) || 1;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) | 0;
    return (state >>> 0) / 4294967296;
  };
}

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: "core" | "edge" | "endpoint";
}

interface Link {
  from: string;
  to: string;
}

export function TopologyDiagram({
  demoId,
  accent,
  accent2,
}: {
  demoId: string;
  accent: string;
  accent2: string;
}) {
  const rnd = seeded(demoId);
  const nodes: Node[] = [
    { id: "core", label: "Core fabric", x: 50, y: 28, kind: "core" },
    { id: "spine-a", label: "Spine A", x: 28, y: 52, kind: "edge" },
    { id: "spine-b", label: "Spine B", x: 72, y: 52, kind: "edge" },
    { id: "leaf-1", label: "Leaf 1", x: 16, y: 78, kind: "edge" },
    { id: "leaf-2", label: "Leaf 2", x: 38, y: 78, kind: "edge" },
    { id: "leaf-3", label: "Leaf 3", x: 62, y: 78, kind: "edge" },
    { id: "leaf-4", label: "Leaf 4", x: 84, y: 78, kind: "edge" },
    { id: "gpu-1", label: "GPU cluster", x: 24, y: 92, kind: "endpoint" },
    { id: "gpu-2", label: "Inference", x: 50, y: 92, kind: "endpoint" },
    { id: "sec", label: "Security", x: 76, y: 92, kind: "endpoint" },
  ];

  const links: Link[] = [
    { from: "core", to: "spine-a" },
    { from: "core", to: "spine-b" },
    { from: "spine-a", to: "leaf-1" },
    { from: "spine-a", to: "leaf-2" },
    { from: "spine-b", to: "leaf-3" },
    { from: "spine-b", to: "leaf-4" },
    { from: "leaf-1", to: "gpu-1" },
    { from: "leaf-2", to: "gpu-2" },
    { from: "leaf-3", to: "gpu-2" },
    { from: "leaf-4", to: "sec" },
  ];

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const style = { "--accent": accent, "--accent2": accent2 } as CSSProperties;

  return (
    <div className={styles.wrap} style={style}>
      <div className={styles.label}>Network topology</div>
      <svg
        className={styles.svg}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Demo network topology diagram"
        role="img"
      >
        <defs>
          <linearGradient id={`topo-grad-${demoId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor={accent2} stopOpacity="0.9" />
          </linearGradient>
          <filter id={`topo-glow-${demoId}`}>
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect className={styles.bg} x="0" y="0" width="100" height="100" rx="4" />

        {links.map((link, i) => {
          const a = nodeMap[link.from];
          const b = nodeMap[link.to];
          if (!a || !b) return null;
          const active = rnd() > 0.35;
          return (
            <line
              key={`${link.from}-${link.to}-${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className={active ? styles.linkActive : styles.link}
            />
          );
        })}

        {nodes.map((node) => (
          <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
            <circle
              r={node.kind === "core" ? 4.2 : node.kind === "edge" ? 3.2 : 2.6}
              className={
                node.kind === "core"
                  ? styles.nodeCore
                  : node.kind === "edge"
                    ? styles.nodeEdge
                    : styles.nodeEndpoint
              }
              filter={`url(#topo-glow-${demoId})`}
            />
            <text
              y={node.kind === "endpoint" ? 6.5 : 7}
              className={styles.nodeLabel}
              textAnchor="middle"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
