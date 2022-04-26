export function beautifyObject(object) {

    function clearObject(node){
        if(node == null) return;
        
        delete node.id
        delete node.sum
        clearObject(node.left);
        clearObject(node.right);
    }

    clearObject(object);
    
    return JSON.stringify(object, null, 3)
}