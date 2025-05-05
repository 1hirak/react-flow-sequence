// pages/index.js

"use client";
import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MiniMap,
  Controls,
  Background,
} from "@xyflow/react";

// Import React Flow CSS – VERY IMPORTANT!
import "@xyflow/react/dist/style.css";
import { Target } from "lucide-react";

const nodesArray = Array(7).fill(0);
// Define the initial nodes
// Think of these as the boxes or elements in your diagram
const initialNodes = nodesArray.map((_, i) => {
  return {
    id: `${i + 1}`,
    position: { x: 0, y: i * 100 },
    data: { label: `Node ${i + 1}` },
  };
});

console.log(initialNodes)

// Define the initial edges
// Think of these as the lines connecting the nodes
const initialEdges = nodesArray.slice(1).map((_,i)=>{return {
  id:`${i+1}-${i+2}`,
  source: `${i+1}`,
  target: `${i+2}`
}})

console.log(initialEdges)

function Flow() {
  // Manage nodes and edges state using useState
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // useCallback is used for performance optimization
  // Handles changes to nodes (like dragging, selecting)
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  // Handles changes to edges (like selecting)
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  // Handles creating new edges by dragging between handles
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    // Set a height for the ReactFlow container!
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange} // Handles node dragging, selection, etc.
        onEdgesChange={onEdgesChange} // Handles edge selection, deletion, etc.
        onConnect={onConnect} // Handles creating new connections
        fitView // Zooms/pans to fit all nodes initially
      >
        {/* Optional helper components */}
        <Controls /> {/* Zoom/pan controls */}
        <MiniMap /> {/* Small overview map */}
        <Background variant="dots" gap={12} size={1} />{" "}
        {/* Background pattern */}
      </ReactFlow>
    </div>
  );
}

export default Flow;
