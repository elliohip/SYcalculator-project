const DISPLAY = document.getElementById("main-d");

// Buttons
document.getElementById("+").addEventListener("click", pick);
document.getElementById("-").addEventListener("click", pick);
document.getElementById("*").addEventListener("click", pick);
document.getElementById("/").addEventListener("click", pick);

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

let selected = new Queue();

var pMap = new Map();

// set key value pairs

pMap.set('+', 1);
pMap.set('-', 1);
pMap.set('*', 2);
pMap.set('/', 2);


// code: 

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
 */
function pick(e) {

    selected.enqueue(e.target.innerHTML);

    console.log(e.target.innerHTML);

    equationString += e.target.innerHTML;
    console.log(selected);
}

/**
 * 
 * @param {number} d data to set display to
 */
function setDisplay(d) {
    DISPLAY.innerHTML = d;
}

setDisplay(equationString);