import React, { useState, useCallback, useMemo, useEffect } from 'react';
import calculateResult from '../../utils/calculate';
import createTree from '../../utils/tree';
import { beautifyObject } from '../../utils/utils'
import Result from '../Result/Result';
import Json from '../Json/Json';

export default function Output({edges, nodes}) {
    const [ json, setJson ] = useState()
    const [ result, setResult ] = useState('');

    useEffect(()=> {
        createOutput(nodes, edges)
    }, [nodes, edges])
    
    function createOutput() {
        if(!nodes.length || !edges.length) {
            setJson();
            setResult('')
        }

        const tree = createTree(nodes, edges);
        const calculatedResult = calculateResult(tree);
        const beautifyedObject = beautifyObject(tree);

        setJson(beautifyedObject)
        setResult(calculatedResult)
    }
    

  return (
    <aside className='output'>
        <Result value={result}/>
        {result ? <Json json={json}/> : null}
    </aside>
  );
};
