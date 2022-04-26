/* eslint-disable no-useless-escape */
/* eslint-disable more/prefer-includes */
/* eslint-disable no-param-reassign */

export default function calculateResult(tree) {
    try {
        checkIsCorrectTree(tree);

        return postOrder(tree);
    } catch (e) {
        // console.error('Wrong tree')
    }
}

export function calculate(str) {
    const sumOrDif = (sub, a, sign, b) => {
        return sign === "-" ? a - b : +a + +b;
    };

    const multOrDiv = (sub, a, sign, b) => {
        return sign === "*" ? a * b : a / b;
    };

    const power = (sub, a, b) => {
        return a ** b;
    };

    const matchPower = /(-?[\d\.]+)\s*\^\s*(-?[\d\.]+)/g;
    const matchMultDiv = /(-?[\d\.]+)\s*([\*\/])\s*(-?[\d\.]+)/g;
    const matchSumDiff = /(-?[\d\.]+)\s*([\+-])\s*(-?[\d\.]+)/g;

    const getValue = (sub, exp) => {
        while (exp.indexOf("^") !== -1) {
            exp = exp.replace(matchPower, power);
        }

        while (matchMultDiv.test(exp)) {
            exp = exp.replace(matchMultDiv, multOrDiv);
        }

        while (matchSumDiff.test(exp)) {
            exp = exp.replace(matchSumDiff, sumOrDif);
        }

        return exp;
    };


    while (str.indexOf("(") !== -1) {
        str = str.replace(/\(([^\(\)]*)\)/g, getValue);
    }

    return getValue("", str);
}

function checkIsCorrectTree(node) {
    if (node === undefined) return;
    if (node.type === "operator") {
        if (!node.left || !node.right) throw new Error();
    }

    if (node.type === "number") {
        if (!node.value)  throw new Error();
    }

    checkIsCorrectTree(node.left);
    checkIsCorrectTree(node.right);
}

function postOrder(node) {
    if (node === undefined) return;
    postOrder(node.left);
    postOrder(node.right);
    if (node.type === "operator") {
        const sum = calculate(`${node.left?.sum || node.left.value} ${node.value} ${node.right?.sum || node.right.value}`);

        // eslint-disable-next-line no-param-reassign
        node.sum = sum;

        return sum;
    }
}

