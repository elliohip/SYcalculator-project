const DISPLAY = document.getElementById("main-d");

const OPERATORS = ['/', '*', '-', '+', '^']

// Buttons
document.getElementById("+").addEventListener("click", pickOperator);
document.getElementById("-").addEventListener("click", pickOperator);
document.getElementById("*").addEventListener("click", pickOperator);
document.getElementById("/").addEventListener("click", pickOperator);


const EQUALS_BUTTON = document.createElement('button');

EQUALS_BUTTON.innerHTML = '=';

EQUALS_BUTTON.addEventListener('click', evaluateExpression);

document.getElementById('ops').appendChild(EQUALS_BUTTON);

/**
 * array to store string representations of user inputed tokens,
 * each item is either a string represented as a number, or an operator
 */
let equation_array = [];

/**
 * string for the user inputed number token, needed to keep track of user input
 */
let token_string = "";



// datastructures

class Queue {

    constructor() {
        this.content = [];
        this.head = 0;
        this.tail = 0;
        this.size = 0;
    }

    enqueue(item) {

        if (this.size == 0) {
            this.content[this.tail] = item;
            this.size++;
        }
        else {

        this.tail++;
        this.content[this.tail] = item;
        this.size++;

        }
        
    }
    dequeue() {
        let o = this.content[this.head];
        delete this.content[this.head];
        this.head++;
        this.size--;
        return o;
    }

    checkFront() {
        return this.content[this.head];
    }

    isEmpty() {
        return this.size==0;
    }

}

class Stack {
    constructor() {
        this.content = [];
        this.size = 0;
    }
        
        push(o) {
            this.content[this.size] = o;
            this.size++;
        }
        pop() {
            let ob = this.content[this.size - 1];
            delete this.content[this.size - 1];
            this.size--;
            return ob;
        }
        peek(){
            return this.content[this.size - 1];
        }
        isEmpty() {
            return this.size == 0;
        }
}


// Structures to be used in conversin to Reverse Polish Notation
let output_queue = new Queue();
let operator_stack = new Stack();

let number_queue = new Queue();

let selected = [];

var pMap = new Map();

// set key value pairs in hashmap, for assesing operator prescedence

pMap.set('+', 1);
pMap.set('-', 1);
pMap.set('*', 2);
pMap.set('/', 2);
pMap.set('^', 3);


// code: 

/**
 * creates a grid of numbers for the calculater as a User Intterface
 */
function createNumbers() {
    for (let i = 0; i <= 10; i++) {

        let b = document.createElement("button");
        
        b.innerHTML = i;
        
        document.getElementById("nums").appendChild(b);

        // add the eventListener
        
        b.addEventListener("click", pick);

        

        

    }
}
createNumbers();

/**
 * eventListener function, allows user to pick a number for token string
 * 
 * @param e
 * event handler param
 */
function pick(e) {

    

    console.log(e.target.innerHTML);

    

    token_string += String(e.target.innerHTML);

    
    console.log("equation string: " + equation_array.toString());
    console.log(token_string);
    setDisplay(equation_array.toString());
}

/**
 * 
 * @param {number} d data to set display to
 */
function setDisplay(d) {
    DISPLAY.innerHTML = d;
}

/**
 * function to pick an operator
 * 
 * @param e
 * event parameter
 */
function pickOperator(e) {

    // operator_stack.push(e.target.innerHTML);

    equation_array.push(token_string);
    equation_array.push(e.target.innerHTML);

    token_string = "";

    console.log('equation string: ' + equation_array.toString());
    setDisplay(equation_array.toString());
}

/**
 * 
 * 
 * needed data: operator_stack, output_queue, number_queue, equation_string
 */
function toPostfix() {

    // basically copies pick operator in begining
    equation_array.push(token_string);

    token_string = "";

    console.log('equation string: ' + equation_array.toString());
    setDisplay(equation_array.toString());

    console.log('postfix fired');

    let index1 = 0;
    let index2 = 0;

    let postfix_string = "";

    for (let i = 0; i < equation_array.length; i++) {

        if (!OPERATORS.includes(equation_array[i])) {

            output_queue.enqueue(equation_array[i])

        }
        if (OPERATORS.includes(equation_array[i])) {

            let operator = equation_array[i];

            console.log(pMap.get(operator_stack.peek()))

            while (pMap.get(operator_stack.peek()) > pMap.get(operator)) {

                output_queue.enqueue(operator_stack.pop());

            }

            operator_stack.push(operator);

        }
        
    }

    while (!operator_stack.isEmpty()) {
        output_queue.enqueue(operator_stack.pop())

    }

    console.log('output_queue: '  + output_queue.content.toString())
    console.log('postfix_string: ' + postfix_string);
}

/**
 * 
 * @param {Number} numb1 
 * first operand
 * @param {Number} numb2 
 * second operand
 * @param {String} operator 
 * operator
 */
function operate(numb1, numb2, operator) {

    switch (operator) {

        case "+": return numb1 + numb2;
        break;
        case "-": return numb1 - numb2;
        break;
        case "*": return numb1 * numb2;
        break;
        case "/": return numb1 / numb2;
        break;
        default: throw new Error("invalid operator"); 
        break;
    }

}

let answer_stack = new Stack();

function evaluateExpression() {
    toPostfix();

    let first_number = 0;
    let second_number = 0;

    let answer = 0;

    let temp = 0;

    console.log(output_queue.content.toString());

    while (!output_queue.isEmpty()) {

        if (!OPERATORS.includes(output_queue.checkFront())) {

            answer_stack.push(output_queue.dequeue());

        }
        if (OPERATORS.includes(output_queue.checkFront())) {

            first_number = parseFloat(answer_stack.pop());
            second_number = parseFloat(answer_stack.pop());

            temp = operate(second_number, first_number, output_queue.dequeue());

            answer_stack.push(temp);

            console.log(answer_stack.peek());
            
            
        }
    }
    setDisplay(answer_stack.peek());
    console.log(answer_stack.peek());


}

setDisplay(equation_array.toString());