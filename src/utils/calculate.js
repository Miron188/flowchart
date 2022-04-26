
export default function calculateResult(tree) {
    try {
        checkIsCorrectTree(tree);
        return postOrder(tree);
    } catch(e) {
        // console.error('Wrong tree')
    }

}

export function calculate(str) {
    const sum_or_diff = function(sub, a, sign, b) {
    return sign === "-" ? a-b : +a + +b;
    };
    const mult_or_div = function(sub, a, sign, b) {
    return sign === "*" ? a*b : a/b;
    };
    const power = function(sub, a, b) {
    return Math.pow(a, b);
    };
    const match_power= /(-?[\d\.]+)\s*\^\s*(-?[\d\.]+)/g;
    const match_mult_div= /(-?[\d\.]+)\s*([\*\/])\s*(-?[\d\.]+)/g;
    const match_sum_diff= /(-?[\d\.]+)\s*([\+-])\s*(-?[\d\.]+)/g;

    const get_value= function(sub, exp) {
    while(exp.indexOf("^")!==-1)
    exp= exp.replace(match_power, power);
    while(match_mult_div.test(exp))
    exp= exp.replace(match_mult_div, mult_or_div);
    while(match_sum_diff.test(exp))
    exp= exp.replace(match_sum_diff, sum_or_diff);
    return exp;
    };
    while(str.indexOf("(") !== -1)
    str=str.replace(/\(([^\(\)]*)\)/g, get_value);

    return get_value("", str);

};
    function checkIsCorrectTree(node){
        if (node == null) return;
        if(node.type === 'operator' ) {
            if (!node.left|| !node.right) throw new Error()
        }   
        if(node.type === 'number' ) {
            if (!node.value )  throw new Error()
        }   
        checkIsCorrectTree(node.left);
        checkIsCorrectTree(node.right);

     
    }

    function postOrder(node){
        if (node == null) return;
            postOrder(node.left);
            postOrder(node.right);   
            if (node.type === 'operator') {
                const sum = calculate(`${node.left?.sum || node.left.value} ${node.value} ${node.right?.sum || node.right.value}`)
                node.sum = sum
                return sum;
            }        
      }

 