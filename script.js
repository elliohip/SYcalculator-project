const DISPLAY = document.getElementById("main-d");

const OPERATORS = ['/', '*', '-', '+', '^']

// Buttons
document.getElementById("+").addEventListener("click", pickOperator);
document.getElementById("-").addEventListener("click", pickOperator);
document.getElementById("*").addEventListener("click", pickOperator);
document.getElementById("/").addEventListener("click", pickOperator);


const EQUALS_BUTTON = document.createElement('button');

EQUALS_BUTTON.innerHTML = '=';

EQUALS_BUTTON.addEventListener('click', toPostfix);

document.getElementById('ops').appendChild(EQUALS_BUTTON);

/**
 * string for the equation
 * IMPORTANT
 */
let equationString = "";



// datastructures

class Queue {

    constructor() {
        this.content = [];
        this.head = 0;
        this.tail = 0;
        this.size = 0;
    }

    enqueue(item) {
        this.content[this.head] = item;
        this.head++;
        this.size++;
    }
    dequeue() {
        let o = content[this.tail];
        delete this.content[this.tail];
        this.size--;
        return o;
    }
    isEmpty() {
        return this.size==0;
    }

    toString() {
        let s = "";

        for (let i = this.head; i < this.content.length; i++) {
            s += this.content[i].toString()

            if (i < this.content.length() - 21) {
                s += ", ";
            }
        }
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
            let ob = content[this.size];
            delete content[this.size];
            return ob;
        }
        peek(){
            return this.content[this.size];
        }
        isEmpty() {
            return this.size==0;
        }
}


// Structures to be used in implementing calculations, conversin to RPN
let outputQueue = new Queue();
let operatorStack = new Stack();

let numberQueue = new Queue();

let selected = [];

var pMap = new Map();

// set key value pairs

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
 * eventListener function, allows user to pick a number for selection queue
 * 
 * @param e
 * event handler param
 */
function pick(e) {

    selected.push(e.target.innerHTML);

    console.log(e.target.innerHTML);

    equationString += e.target.innerHTML;
    console.log(selected);
    setDisplay(equationString);
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
    operatorStack.push(e.target.innerHTML);
    // numberQueue.enqueue(Number(selected.toString()));
    selected = [];
    equationString += e.target.innerHTML;
    console.log('equation_string: ' + equationString);
    setDisplay(equationString);
}

/**
 * 
 * 
 * needed data: operatorStack, outputQueue, numberQueue, equationString
 */
function toPostfix() {

    console.log('postfix fired');

    let index1 = 0;
    let index2 = 0;

    let postfixString = "";

    for (let i = 0; i < equationString.length; i++) {

        if (!OPERATORS.includes(equationString.charAt(i))) {

            index2++;

            
            
        }

        if (OPERATORS.includes(equationString.charAt(i))) {

            let operator = equationString.charAt(i);

            numberQueue.enqueue(Number(equationString.substring(index1, index2)));

            console.log("substring: " + equationString.substring(index1, index2));

            postfixString += equationString.substring(index1, index2);
            

            if (pMap.get(operatorStack.peek()) > pMap.get(operator) || operatorStack.peek() == undefined) {
                
                postfixString += operator;
                console.log(operator);
                console.log('postfix_string: ' + postfixString);
            }

            console.log(operator);
            index2++;
            index1 = index2;
            
            

        }
    }
    console.log('number_queue: '  + numberQueue)
    console.log('postfix_string: ' + postfixString);
}

setDisplay(equationString);