// pages/index.js

'use client'
import React, { useState, useCallback } from 'react';
import { ReactFlow, addEdge, applyNodeChanges, applyEdgeChanges, MiniMap, Controls, Background } from '@xyflow/react';

// Import React Flow CSS – VERY IMPORTANT!
import '@xyflow/react/dist/style.css';
// Define the initial nodes
// Think of these as the boxes or elements in your diagram
const initialNodes = [
  {
    id: '1', // Unique ID for this node
    position: { x: 0, y: 0 }, // X and Y coordinates on the canvas
    data: { label: 'Node 1' }, // Data associated with the node (often includes the label)
    type: 'input', // Optional: defines the node type (default, input, output)
  },
  {
    id: '2',
    position: { x: 0, y: 100 },
    data: { label: 'Node 2' },
  },
  {
    id: '3',
    position: { x: 0, y: 200 },
    data: { label: 'Node 3' },
    
  },
];

// Define the initial edges
// Think of these as the lines connecting the nodes
const initialEdges = [
  {
    id: 'e1-2', // Unique ID for this edge
    source: '1', // The ID of the source node
    target: '2', // The ID of the target node
    // You can add labels, types (bezier, step, smoothstep), animated=true etc. here
  },
  {
    id: 'e2-3', // Unique ID for this edge
    source: '2', // The ID of the source node
    target: '3', // The ID of the target node
    // You can add labels, types (bezier, step, smoothstep), animated=true etc. here
  },
];

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
    <div style={{ height: '100vh', width: '100%' }}>
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
        <Background variant="dots" gap={12} size={1} /> {/* Background pattern */}
      </ReactFlow>
    </div>
  );
}

export default Flow;