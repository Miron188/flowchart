import { Handle, Position } from 'react-flow-renderer';
import './Number.css'

function Number({data, id}) {
  const onChange = (evt) => {
    data.onChange(evt, id)
  };

  return (
    <div className="number-node">
        <input id="text" name="text" onChange={onChange} pattern="[0-9]*"/>
        <Handle type="source" position={Position.Bottom} id="a"/>
    </div>
  );
}

export default Number;