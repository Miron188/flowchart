import React, { useMemo } from "react";
import calculateResult from "../../utils/calculate";
import createTree from "../../utils/tree";
import { beautifyObject } from "../../utils/utils";
import Result from "../Result/Result";
import Json from "../Json/Json";

function Output({ edges, nodes }) {
    const values = nodes.map(i => i.data.value).toString();

    const { beautifyedObject, calculatedResult } = useMemo(
        () =>
            createOutput(nodes, edges),
        [ nodes.length, edges.length, values ]
    );

    function createOutput() {
        if (!nodes.length || !edges.length) {
            return { beautifyedObject: null, calculatedResult: "" };
        }

        const tree = createTree(nodes, edges);


        return { beautifyedObject: beautifyObject(tree), calculatedResult: calculateResult(tree) };
    }

    return (
        <aside className='output'>
            <Result value={calculatedResult} />
            {calculatedResult ? <Json json={beautifyedObject} /> : null}
        </aside>
    );
}

export default React.memo(Output);
