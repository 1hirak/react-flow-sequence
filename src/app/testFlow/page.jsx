'use client'
import { useState, useCallback, useReducer, useMemo } from 'react';
import { ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React from 'react';

const initialState = {
  nodes: [
    { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 5 } },
    { id: '2', type: 'buttonNode', data: { label: '+' }, position: { x: 250, y: 100 } },
  ],
  edges: [],
  showForm: false,
};

const flowReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NODE':
      const newNode = {
        id: `${state.nodes.length + 1}`,
        type: action.payload.type,
        data: { label: action.payload.label },
        position: { x: Math.random() * 400, y: Math.random() * 400 },
      };
      return { ...state, nodes: [...state.nodes, newNode], showForm: false };
    case 'TOGGLE_FORM':
      return { ...state, showForm: action.payload };
    case 'ADD_EDGE':
      return { ...state, edges: addEdge(action.payload, state.edges) };
    default:
      return state;
  }
};

const NodeForm = ({ onSubmit, onClose }) => {
  const [label, setLabel] = React.useState('');
  const [type, setType] = React.useState('default');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ label, type });
    setLabel('');
    setType('default');
    onClose();
  };

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
      width: '300px', // Fixed width for a compact form
      height: 'auto', // Height adjusts based on content
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Node Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Node Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="default">Default</option>
            <option value="input">Input</option>
            <option value="output">Output</option>
          </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            style={{ marginRight: '10px', padding: '5px 10px' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ padding: '5px 10px', background: '#3b82f6', color: 'white', border: 'none' }}
          >
            Add Node
          </button>
        </div>
      </form>
    </div>
  );
};

const ButtonNode = ({ data }) => {
  return (
    <div style={{
      padding: '10px',
      background: '#10b981',
      color: 'white',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '20px',
    }}>
      {data.label}
    </div>
  );
};

const nodeTypes = {
  buttonNode: ButtonNode,
};

const Flow = () => {
  const [state, dispatch] = useReducer(flowReducer, initialState);
  const [nodes, setNodes, onNodesChange] = useNodesState(state.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(state.edges);

  React.useEffect(() => {
    setNodes(state.nodes);
    setEdges(state.edges);
  }, [state.nodes, state.edges, setNodes, setEdges]);

  const updatedNodes = useMemo(() => {
    const maxY = Math.max(...nodes.filter(n => n.type !== 'buttonNode').map(n => n.position.y), 5);
    return nodes.map(node => {
      if (node.type === 'buttonNode') {
        return { ...node, position: { x: 250, y: maxY + 100 } };
      }
      return node;
    });
  }, [nodes]);

  const onConnect = useCallback(
    (params) => dispatch({ type: 'ADD_EDGE', payload: params }),
    []
  );

  const addNewNode = (nodeData) => {
    dispatch({ type: 'ADD_NODE', payload: nodeData });
  };

  const toggleForm = (show) => {
    dispatch({ type: 'TOGGLE_FORM', payload: show });
  };

  const onNodeClick = useCallback((event, node) => {
    if (node.type === 'buttonNode') {
      toggleForm(true);
    }
  }, []);

  return (
    <div style={{ height: '100vh',width:'80vw' }}>
      {state.showForm && (
        <NodeForm
          onSubmit={addNewNode}
          onClose={() => toggleForm(false)}
        />
      )}
      <ReactFlow
        nodes={updatedNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      />
    </div>
  );
};

export default Flow;