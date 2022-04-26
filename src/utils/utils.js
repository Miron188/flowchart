/* eslint-disable no-magic-numbers */
/* eslint-disable no-param-reassign */
export function beautifyObject(object) {
    function clearObject(node) {
        if (node === undefined) return;

        delete node.id;
        delete node.sum;
        clearObject(node.left);
        clearObject(node.right);
    }

    clearObject(object);

    return JSON.stringify(object, null, 3);
}
