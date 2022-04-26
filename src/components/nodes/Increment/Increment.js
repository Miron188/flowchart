import { Handle, Position } from "react-flow-renderer";
import "./Increment.css";
import React, { useEffect } from "react";
import OPERATORS from "../../../constants/operators";

function IncrementNode({ data, id }) {
    const className = `${data.operatorType} node`;

    useEffect(() => {
        data.setVaue(OPERATORS[data.operatorType], id);
    }, []);

    return (
        <div className={className}>
            <Handle type='source' position={Position.Bottom} id='bottom' />
            <Handle type='target' position={Position.Left} id='left' />
            {OPERATORS[data.operatorType]}
            <Handle type='target' position={Position.Right} id='right' />
        </div>
    );
}

export default IncrementNode;
