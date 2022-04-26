import React from 'react';
import './Sidebar.css'

export default function Sidebar({child}) {
  const onDragStart = (event, nodeType, operatorType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('operatorType', operatorType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside id="sidebar">
      <div className="dndnode text" onDragStart={(event) => onDragStart(event, 'number')} draggable>
        Number
      </div>
      <div className="dndnode increment" onDragStart={(event) => onDragStart(event, 'operator', 'increment')} draggable>
        +
      </div>
      <div className="dndnode decrement" onDragStart={(event) => onDragStart(event, 'operator', 'decrement')} draggable>
        -
      </div>
      <div className="dndnode multiply" onDragStart={(event) => onDragStart(event, 'operator', 'multiply')} draggable>
        *
      </div>
      <div className="dndnode divide" onDragStart={(event) => onDragStart(event, 'operator', 'divide')} draggable>
        /
      </div>
      {child}
    </aside>
  );
};
