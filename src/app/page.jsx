"use client";
import React, { useState, useReducer, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ActionPopup from "../components/actionPopup";
import { CirclePlus, Clock, Mail,ArrowRight  } from "lucide-react";

import {
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MiniMap,
  Controls,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Define the initial nodes
// Think of these as the boxes or elements in your diagram

const initialstate = [];
const reducer = (state, action) => {
  switch (action.type) {
    case "email": {
      let val = {
        id: state.length + 1,
        type: "email",
        title: action.payload.title,
        data: {
          type: "email",
          title: action.payload.title,
          subject_line: action.payload.subject_line,
          email_body: action.payload.email_body,
        },
      };
      console.log(state);
      return [...state, val];
    }
    case "delay": {
      let val = {
        id: state.length + 1,
        type: "delay",
        title: `${
          action.payload.hours ? action.payload.hours + " hours " : ""
        } ${
          action.payload.minutes ? action.payload.minutes + " minutes " : ""
        }${action.payload.seconds ? action.payload.seconds + " seconds " : ""}`,

        data: {
          type: "dealy",
          hours: action.payload.hours,
          minutes: action.payload.minutes,
          seconds: action.payload.seconds,
        },
      };
      return [...state, val];
    }
    default:
      return state;
  }
};

function Flow() {
  const [showActionPopup, setshowActionPopup] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialstate);
  console.log(state);
  const initialNodes = state
    .map((x, i) => {
      return {
        id: `${i + 1}`,
        position: { x: 0, y: (i + 2) * 150 },
        data: {
          label: (
            <div className="flex w-full">
              {/* Left section (30%) with icon */}
              <div className="w-3/10 flex items-center justify-center">
                {x.type === "delay" ? (
                  <Clock color="#FFA500" size={24} />
                ) : (
                  <Mail color="#144ee0" size={24} />
                )}
              </div>

              {/* Right section (70%) with content */}
              <div className="w-7/10 flex flex-wrap">
                <div className="text-gray-800 font-bold ">
                  {x.type === "delay" ? "Delay:" : "Email:"}
                </div>
                <div className="font-normal">{x.title}</div>
              </div>
            </div>
          ),
          color: "#FFA500",
        },
        style: {
          background: "#FFFFFF",
          padding: 10,
          border: "1px solid #ddd",
          borderRadius: 4,
          width: 220,
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
          width: 220,
        },
      },
    ])
    .concat([
      {
        id: `two`,
        position: { x: 0, y: (state.length + 2) * 150 },
        data: {
          label: (
            <div
              onClick={() => setshowActionPopup(true)}
              className="flex items-center justify-center cursor-pointer"
              style={{ width: "100%" }} // Inherit the width from the parent node
            >
              <div className="flex items-center justify-center">
                <CirclePlus stroke="#1ba6c2" />
              </div>
            </div>
          ),
          color: "#FFA500",
        },
        style: {
          background: "#FFF", 
          padding: "1px",
          height: "2.5vh",
          width: "220px", 
          border: "1px solid #ddd",
          display: "flex",
          justifyContent: "center", 
          alignItems: "center",
        },
      },
    ]);

  // console.log(initialNodes);

  // Define the initial edges
  // Think of these as the lines connecting the nodes

  const defaultInitialedges = [
    {
      id: `one`,
      source: "one",
      target: "two",
    },
  ];

  const modifiedInitialEdgesOne = [
    { id: `one`, source: "one", target: `${state[0] ? state[0].id : ""}` },
  ].concat({
    id: `two`,
    source: `${state[0] ? state[0].id : ""}`,
    target: "two",
  });

  const modifiedInitialEdgesOnePlus = [
    { id: `one`, source: "one", target: `${state[0] ? state[0].id : ""}` },
  ]
    .concat(
      state.map((x, i) => {
        return {
          id: `${i}`,
          source: `${i + 1}`,
          target: `${i + 2}`,
        };
      })
    )
    .concat({
      id: `two`,
      source: `${state[state.length - 1] ? state[state.length - 1].id : ""}`,
      target: "two",
    });

  const initialEdges = () => {
    if (state[0]) {
      if (state[1]) {
        return modifiedInitialEdgesOnePlus;
      }
      if (!state[1]) {
        return modifiedInitialEdgesOne;
      }
    } else {
      return defaultInitialedges;
    }
  };

  //fixes
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [state]);

const handleSubmit =()=>{
  
  let val = state.map(x=>[x.id,x.data])
  let obj = Object.fromEntries(val)
  console.log(obj)

  alert(JSON.stringify(obj))
}



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
      {showActionPopup && (
        <ActionPopup
          handleClose={() => {
            setshowActionPopup(false);
          }}
          dispatch={dispatch}
        />
      )}

      <div className="bg-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div></div>
            <div>
              <Button className="bg-blue-600 text-white font-medium py-2 px-4 rounded flex gap-1.5"
              onClick={handleSubmit}
              >
                Create Sequence <ArrowRight/>
              </Button>
            </div>
          </div>
        </div>
      </div>

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
