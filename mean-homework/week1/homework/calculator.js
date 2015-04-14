var inputReader = require("readline-sync");
var answer  = inputReader.question("Please enter two operands and an operator(example: 2+2)- ");
var result = calculate(answer);
if(typeof result === "undefined")
{
    console.log("Please enter a proper mathematical expression.");
}
else
{
    console.log("Result of " + answer + " is " + result);
}

/**
 * This function calculates the result of two operands and an operator.
 * The following operators are supported: +,-,*,/,% .
 * 
 * @param {string} expression the mathematical expression to be evaluated by the function
 * @returns {number} a number that was the result of evaluating the passed in expression
 */
function calculate(expression)
{
    var operators = ["%","/","*","-","+"];
    var indexOfOperator = -1;
    var operator = "";
    var identifiedOperator = "";
    for(var operatorIndex = 0; operatorIndex < operators.length; operatorIndex++)
    {
        operator = operators[operatorIndex];
        indexOfOperator = expression.indexOf(operator);
        if(indexOfOperator !== -1)
        {
            identifiedOperator = operator;
            break;
        }
    }
    //No operator found so exit function.
    if(identifiedOperator === "")
    {
        return;
    }
     //Retrieve operands
     var operands = expression.split(operator);
     var leftOperand = parseInt(operands[0].trim());
     var rightOperand = parseInt(operands[1].trim()); 
     
     //Missing operand so exit function.
     if(!leftOperand || !rightOperand)
     {
         return;
     }
     
     //Compute result using the function corresponding to the operator.
     var result;
     switch (operator) 
     {
         case '+':
            result = add(leftOperand,rightOperand); 
             break;
         case '-':
             result = subtract(leftOperand,rightOperand);
             break;
         case '*':
             result = multiply(leftOperand, rightOperand);
             break;
         case '/':
            result = divide(leftOperand, rightOperand);
            break;
         case "%":
             result = remainder(leftOperand, rightOperand);
             break;
         default:
             result = undefined;
     }
     return result;
}

function add(leftOperand, rightOperand)
{
    return leftOperand + rightOperand;
}

function subtract(leftOperand,rightOperand)
{
    return leftOperand - rightOperand;
}

function multiply(leftOperand, rightOperand)
{
    return leftOperand * rightOperand;
}

function divide(leftOperand, rightOperand)
{
    return leftOperand / rightOperand;
}

function remainder(leftOperand, rightOperand)
{
    return leftOperand % rightOperand;
}