export default function createTree(nodes, edges) {
    const formatedArray = formatArray(nodes, edges)
    const finalObject = createObject(formatedArray);
    formatedArray.forEach((element, id) => {
        if (element.left && finalObject[element.id]?.left){
            finalObject[element.id].left = finalObject[element?.left] || {};
            delete finalObject[element.left.id];
        }
        if (element.right && finalObject[element.id]?.right){
            finalObject[element.id].right = finalObject[element?.right] || {};
            delete finalObject[element.right.id];
        }
        if (element.left && !finalObject[element.id] && finalObject[element.left]){
            finalObject[element.left].id = finalObject[element?.left] || {};
            delete finalObject[element.left.id];
        }

        if (element.right && !finalObject[element.id] && finalObject[element.right]){
            finalObject[element.right].id = finalObject[element?.right] || {};
            delete finalObject[element.right.id];
        }
    });


    return Object.values(finalObject)[0];
}

function formatArray(nodes, edges) {
    return nodes.map(n => {
        const connectedEdges = edges.filter(e => e.target === n.id)
 
         let res = { 
             id: n.id,
             type: n.type,
           }
 
           if(n.data.value) res.value = n.data.value;
 
           if(connectedEdges.length){ 
                connectedEdges.forEach(i => {
                   res[i.targetHandle] = i.source;
                 })
             }
 
           return res;
     })
}

 function createObject(newArr) {
    const result = {};
    
    newArr.forEach((arr) => result[arr.id] = arr)
 return result
} 