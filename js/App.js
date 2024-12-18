"use strict"

import generateTableOfSizeN from "./GenerateChessBoard.js"; // function to generate a chess board of size n x n

import { setCountOfChessBoards, clearAnimationsArr, getAnimationsArr } from "./PrintNQueens.js";
import cloneTableOfSizeN from "./CloneChessBoard.js"; // function to clone a chess board of size n x n

const valueOfNInputElement = document.getElementById("value-of-n");
const startButton = document.getElementById("start-visualization");
const nQueensVisualizerSection = document.getElementById("n-queens-visualizer-section");
const logSection = document.getElementById("log-section");

let n = 0;
let chess = 0;
let animationsArr = new Array();
startButton.addEventListener("click", () => {
    if (valueOfNInputElement.value) {
        // disable the Start Visualization Button to prevent multiple clicks
        startButton.setAttribute("disabled", "disabled");
        // disable the input field to prevent changing of the input value
        valueOfNInputElement.setAttribute("disabled", "disabled");

        n = valueOfNInputElement.value;

        makeChessArr(); // inititalize chess to an n x n matrix and make all its elements = 0

        clearNQueensVisualizerSection(); // clear the N Queens Visualizer Section

        resetLogSection(); // reset the Log Section to show only the title "Logs"

        generateTableOfSizeN(n, 1); // display a chess board of size n x n

        setCountOfChessBoards(1); //set countOfChessBoard to 1 in PrintNQueens.js
        clearAnimationsArr(); // clears animationsArr in PrintQueens.js
        animationsArr = getAnimationsArr(chess, 0); // function that returns an array of animation functions with parameters to visualize the solution algorithm

        animateNQueens(); // function to visualize the solution algorithm
    }
});

function makeChessArr() {
    chess = new Array(n); // add rows

    // add columns
    for (let i = 0; i < n; i++) {
        chess[i] = new Array(n);
    }

    // initialize all values to 0
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            chess[i][j] = 0;
        }
    }
}


function clearNQueensVisualizerSection() {
    nQueensVisualizerSection.innerHTML = "";
}

/** Reset the Log Section to show only the title "Logs" */
function resetLogSection() {
    logSection.innerHTML = ""; // delete all the innerHTML of Log Section by making its innerHTML = ""

    const pTag = document.createElement("p"); // create a new <p> tag
    pTag.innerHTML = "Logs"; // <p>Logs</p>

    const hrTag = document.createElement("hr"); // create a new <hr> tag

    pTag.appendChild(hrTag); // <p>Logs <hr></p>

    logSection.appendChild(pTag); // add the <p>Logs <hr></p> to the Log Section
}

/**
 * Create a delay using promise
 * @param {Number} time The delay time in milliseconds
 * @returns {Promise} A promise that will resolve after the given time in milliseconds
 */
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time)); // the promise is resolved after the given time
}


async function animateNQueens() {
    // access each array in animationsArr in the order it is stored in the animationsArr
    for (let functionArr of animationsArr) {
        /** The animation function to call */
        let animationFunction = functionArr[0];
        /** array of arguments to pass to the animatin function */
        let args = functionArr[1];

        await delay(200); // create a delay to show the animation step-by-step
        animationFunction(...args); // call the function with its respective parameters
    }

    await delay(200); // create a delay after the animation is over

    valueOfNInputElement.removeAttribute("disabled"); // disable the input field to prevent changing of the input value
    startButton.removeAttribute("disabled"); // enable the Start Visualization Button
}