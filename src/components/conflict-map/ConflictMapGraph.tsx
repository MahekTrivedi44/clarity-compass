import { useEffect, useRef, useState, useCallback } from "react";
import { claims, conflictRelations, consensusClusters } from "@/data/dummyData";
import { HowItsMade, techConfigs } from "@/components/HowItsMade";
import { ZoomIn, ZoomOut, Maximize2, Filter } from "lucide-react";

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  source: string;
  category: string;
  confidence: number;
  radius: number;
}

interface Edge {
  source: string;
  target: string;
  type: "contradiction" | "partial_conflict" | "supports" | "ambiguous";
  severity: string;
}

export const ConflictMapGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [filter, setFilter] = useState<string | null>(null);
  const animationRef = useRef<number>();

  // Initialize nodes from claims
  useEffect(() => {
    const width = containerRef.current?.clientWidth || 800;
    const height = containerRef.current?.clientHeight || 600;

    const initialNodes: Node[] = claims.map((claim, i) => ({
      id: claim.claim_id,
      x: width / 2 + (Math.random() - 0.5) * 300,
      y: height / 2 + (Math.random() - 0.5) * 300,
      vx: 0,
      vy: 0,
      label: claim.content.substring(0, 50) + "...",
      source: claim.source,
      category: claim.category,
      confidence: claim.confidence,
      radius: 20 + claim.confidence * 10,
    }));

    const initialEdges: Edge[] = conflictRelations.map((rel) => ({
      source: rel.claim_a_id,
      target: rel.claim_b_id,
      type: rel.type,
      severity: rel.severity,
    }));

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

  // Force-directed simulation
  useEffect(() => {
    if (nodes.length === 0) return;

    const width = containerRef.current?.clientWidth || 800;
    const height = containerRef.current?.clientHeight || 600;
    const centerX = width / 2;
    const centerY = height / 2;

    const simulate = () => {
      setNodes((prevNodes) => {
        const newNodes = [...prevNodes];

        // Apply forces
        for (let i = 0; i < newNodes.length; i++) {
          // Center gravity
          newNodes[i].vx += (centerX - newNodes[i].x) * 0.001;
          newNodes[i].vy += (centerY - newNodes[i].y) * 0.001;

          // Node repulsion
          for (let j = i + 1; j < newNodes.length; j++) {
            const dx = newNodes[j].x - newNodes[i].x;
            const dy = newNodes[j].y - newNodes[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = 2000 / (dist * dist);

            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            newNodes[i].vx -= fx;
            newNodes[i].vy -= fy;
            newNodes[j].vx += fx;
            newNodes[j].vy += fy;
          }
        }

        // Edge forces (spring)
        for (const edge of edges) {
          const sourceNode = newNodes.find((n) => n.id === edge.source);
          const targetNode = newNodes.find((n) => n.id === edge.target);

          if (sourceNode && targetNode) {
            const dx = targetNode.x - sourceNode.x;
            const dy = targetNode.y - sourceNode.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const targetDist = edge.type === "supports" ? 100 : 150;
            const force = (dist - targetDist) * 0.01;

            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            sourceNode.vx += fx;
            sourceNode.vy += fy;
            targetNode.vx -= fx;
            targetNode.vy -= fy;
          }
        }

        // Apply velocity with damping
        for (const node of newNodes) {
          node.vx *= 0.9;
          node.vy *= 0.9;
          node.x += node.vx;
          node.y += node.vy;

          // Boundary constraints
          node.x = Math.max(50, Math.min(width - 50, node.x));
          node.y = Math.max(50, Math.min(height - 50, node.y));
        }

        return newNodes;
      });

      animationRef.current = requestAnimationFrame(simulate);
    };

    animationRef.current = requestAnimationFrame(simulate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes.length, edges]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(offset.x, offset.y);
      ctx.scale(zoom, zoom);

      // Draw edges
      for (const edge of edges) {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        const targetNode = nodes.find((n) => n.id === edge.target);

        if (sourceNode && targetNode) {
          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);

          if (edge.type === "contradiction") {
            ctx.strokeStyle = "hsl(32, 95%, 55%)";
            ctx.lineWidth = edge.severity === "high" ? 3 : 2;
          } else if (edge.type === "partial_conflict") {
            ctx.strokeStyle = "hsl(32, 95%, 55%, 0.6)";
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
          } else if (edge.type === "supports") {
            ctx.strokeStyle = "hsl(152, 69%, 45%)";
            ctx.lineWidth = 2;
          } else {
            ctx.strokeStyle = "hsl(215, 20%, 40%)";
            ctx.lineWidth = 1;
          }

          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Draw nodes
      for (const node of nodes) {
        if (filter && node.source !== filter) continue;

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        // Color based on source
        const sourceColors: Record<string, string> = {
          "Claimant Statement": "hsl(262, 83%, 58%)",
          "Adjuster Report": "hsl(173, 58%, 45%)",
          "Repair Invoice": "hsl(32, 95%, 55%)",
          "Traffic Authority": "hsl(152, 69%, 45%)",
          "Witness Statement": "hsl(200, 70%, 50%)",
        };

        ctx.fillStyle = sourceColors[node.source] || "hsl(215, 20%, 40%)";
        ctx.fill();

        // Border
        ctx.strokeStyle =
          hoveredNode?.id === node.id
            ? "hsl(0, 0%, 100%)"
            : "hsl(222, 30%, 20%)";
        ctx.lineWidth = hoveredNode?.id === node.id ? 3 : 2;
        ctx.stroke();

        // Glow for hovered
        if (hoveredNode?.id === node.id) {
          ctx.shadowColor = sourceColors[node.source] || "hsl(173, 58%, 45%)";
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      ctx.restore();
      requestAnimationFrame(draw);
    };

    draw();
  }, [nodes, edges, hoveredNode, zoom, offset, filter]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse handlers
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left - offset.x) / zoom;
      const y = (e.clientY - rect.top - offset.y) / zoom;

      if (isDragging) {
        setOffset({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
        return;
      }

      // Check for node hover
      let found = false;
      for (const node of nodes) {
        const dx = node.x - x;
        const dy = node.y - y;
        if (Math.sqrt(dx * dx + dy * dy) < node.radius) {
          setHoveredNode(node);
          found = true;
          break;
        }
      }
      if (!found) setHoveredNode(null);
    },
    [nodes, zoom, offset, isDragging, dragStart]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const sources = [...new Set(claims.map((c) => c.source))];

  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">Conflict Map</h3>
          <span className="text-xs text-muted-foreground">
            {nodes.length} claims · {edges.length} relationships
          </span>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value || null)}
            className="h-8 px-3 bg-secondary border border-border rounded-lg text-sm text-foreground"
          >
            <option value="">All Sources</option>
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.2, 2))}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ZoomIn className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ZoomOut className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => {
              setZoom(1);
              setOffset({ x: 0, y: 0 });
            }}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <Maximize2 className="w-4 h-4 text-muted-foreground" />
          </button>
          <HowItsMade {...techConfigs.conflictMap} />
        </div>
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="flex-1 relative bg-background/50">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />

        {/* Hover tooltip */}
        {hoveredNode && (
          <div
            className="absolute pointer-events-none glass-panel p-3 max-w-xs animate-fade-in"
            style={{
              left: hoveredNode.x * zoom + offset.x + 30,
              top: hoveredNode.y * zoom + offset.y - 20,
            }}
          >
            <p className="text-sm font-medium text-foreground mb-1">
              {hoveredNode.label}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-0.5 bg-secondary rounded">
                {hoveredNode.source}
              </span>
              <span>{hoveredNode.category}</span>
              <span className="font-mono">
                {(hoveredNode.confidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 glass-panel p-3 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Legend</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-0.5 bg-conflict" />
              <span className="text-muted-foreground">Contradiction</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-0.5 bg-conflict/60 border-dashed" />
              <span className="text-muted-foreground">Partial Conflict</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-0.5 bg-consensus" />
              <span className="text-muted-foreground">Supports</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
