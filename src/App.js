/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable max-lines-per-function */
import React, { useState, useRef, useCallback, useMemo } from "react";
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls
} from "react-flow-renderer";

import NumberNode from "./components/nodes/Number/NumberNode";
import IncrementNode from "./components/nodes/Increment/Increment";

import Sidebar from "./components/Sidebar/Sidebar";
import Output from "./components/Output/Output";

import "./index.css";

let id = 0;
const getId = (type) => `${type}_${id++}`;

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [ nodes, setNodes, onNodesChange ] = useNodesState([]);
    const [ edges, setEdges, onEdgesChange ] = useEdgesState([]);
    const [ reactFlowInstance, setReactFlowInstance ] = useState(null);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const handleClearAll = () => {
        setNodes([]);
        setEdges([]);
    };

    const setValueIntoNumberNode = (event, id) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id !== id) {
                    return node;
                }

                let value = event.target.value;

                if (!Number(value)) {
                    value = "";
                }

                return {
                    ...node,
                    data : {
                        ...node.data,
                        value
                    }
                };
            }));
    };

    const setValueIntoOperatorNode = (value, id) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id !== id) {
                    return node;
                }

                return {
                    ...node,
                    data : {
                        ...node.data,
                        value
                    }
                };
            }));
    };

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");

            if (typeof type === "undefined" || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x : event.clientX - reactFlowBounds.left,
                y : event.clientY - reactFlowBounds.top
            });

            const newNode = {
                id   : getId(type),
                type,
                position,
                data : { label: `${type} node` }
            };

            if (type === "number") {
                newNode.data.onChange = setValueIntoNumberNode;
            } else {
                newNode.data.setVaue = setValueIntoOperatorNode;
                newNode.data.operatorType = event.dataTransfer.getData("operatorType");
            }


            setNodes((nds) => nds.concat(newNode));
        },
        [ reactFlowInstance ]
    );

    const nodeTypes = useMemo(() => ({ number: NumberNode, operator: IncrementNode }), []);

    return (
        <div className='dndflow'>
            <ReactFlowProvider>
                <Sidebar
                    child={
                        <button onClick={handleClearAll}>Clear all</button>
                    }
                />

                <div className='reactflow-wrapper' ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        fitView
                        nodeTypes={nodeTypes}
                    >
                        <Controls />
                    </ReactFlow>
                </div>

                <Output
                    nodes={nodes}
                    edges={edges}
                />
            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;
