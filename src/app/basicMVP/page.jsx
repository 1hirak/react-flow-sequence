"use client";
import React, { useState,  useReducer, useCallback } from "react";
import { Button } from "@/components/ui/button";
import EmailComposePopup from "../../components/email";
import Dealy from "../../components/delay";
import ActionPopup from "../../components/actionPopup";
import { CirclePlus } from "lucide-react";

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
import Delay from "../../components/delay";


// Define the initial nodes
// Think of these as the boxes or elements in your diagram

const initialstate = Array(7).fill(0);
const reducer = (state,action)=>{

  switch (action.type) {
    case "email":
       console.log("email dispatched")
       return state
      case "delay":
         console.log("delay dispatched")
         return state
        
    
  
    default:
      return state
  }

}


function Flow() {
  const [showActionPopup, setshowActionPopup] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialstate )

  const initialNodes = state.map((_, i) => {
      return {
        id: `${i + 1}`,
        position: { x: 0, y: (i + 2) * 150 },
        data: {
          label: (
            <div>
              <strong>Node {i + 1}</strong>
              <p>Custom Info</p>
              <Button onClick={() => initiateStatechange()}>Button</Button>
            </div>
          ),
          color: "#FFA500",
        },
        style: {
          background: "#FFA500", // Apply color directly to node background
          padding: 10,
          border: "1px solid #ddd",
        },
      };
    })
    .concat([
      {
        id: `one`,
        position: { x: 0, y: 200 },
        data: {
          label: <div>Sequence Start Point</div>,
          color: "#FFA500",
        },
        style: {
          background: "#FFF", // Apply color directly to node background
          padding: 10,
          border: "1px solid #ddd",
        },
      },
    ])
    .concat([
      {
        id: `two`,
        position: { x: 60, y: 250 },
        data: {
          label: (
            <div
              onClick={() => setshowActionPopup(true)}
              className="flex items-center justify-center cursor-pointer "
            >
              <CirclePlus stroke="blue" />
            </div>
          ),
          color: "#FFA500",
        },
        style: {
          background: "#FFF", // Apply color directly to node background
          padding: "1px",
          height: "2.5vh",
          width: "2.7vw",
          border: "1px solid #ddd",
        },
      },
    ]);

  console.log(initialNodes);

  // Define the initial edges
  // Think of these as the lines connecting the nodes
  const initialEdges = state.slice(1).map((_, i) => {
    return {
      id: `${i + 1}-${i + 2}`,
      source: `${i + 1}`,
      target: `${i + 2}`,
    };
  });

  console.log(initialEdges);

  const [showEmailPopup, setshowEmailPopup] = useState(false);

  const initiateStatechange = () => {
    setshowEmailPopup(true);
  };

  // Manage nodes and edges state using useStat\
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
      {showEmailPopup && (
        <EmailComposePopup onClose={() => setshowEmailPopup(false)} />
      )}
      {showActionPopup && (
        <ActionPopup
          handleClose={() => {
            setshowActionPopup(false)
          }}
          dispatch = {dispatch}
        />
      )}

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
