function eval() {
    // Do not use eval!!!
    return;
}

const operation = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
}

function calculate(array) {

    for (let j = 0; j < array.length; j++) {

        if (array[j] == '/' || array[j] == '*') {

            let value = operation[array[j]](+array[j - 1], +array[j + 1]);

            array.splice(j - 1, 3, value);

            j = -1;

        }

    }

    for (let j = 0; j < array.length; j++) {

        if (array[j] == '+' || array[j] == '-') {

            let value = operation[array[j]](+array[j - 1], +array[j + 1]);

            array.splice(j - 1, 3, value);

            j = -1;

        }

    }

    return +array[0];
}

function expressionCalculator(expr) {

    if (expr.replace(/\s/g, '').match(/\/0/g))
        throw new Error('TypeError: Division by zero.');

    if (expr.replace(/\s/g, '').replace(/\(/g, '').length != expr.replace(/\s/g, '').replace(/\)/g, '').length) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    expr = expr.replace(/\s/g, '').replace(/(\*|\/|\+|\-)/g, " $& ");

    if (expr.includes('(')) {

        for (let i = expr.match(/\(/g).length; i != 0; i--) {

            let brackets = expr.match(/(\([0-9\+\/\*\-. ]+\))/g)[0];
            let expression = brackets.slice(1, brackets.length - 1);

            expr = expr.replace(brackets, calculate(expression.split(' ')));

        }
    }

    return calculate(expr.split(' '));
}


module.exports = {
    expressionCalculator
}