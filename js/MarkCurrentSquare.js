"use strict"
const logSection = document.getElementById("log-section");


function markCurrentSqaureBlue(row, col, tableNumber) {
    // get the table cell by it id Eg. id = "table-1-row-1-col-1" will get the cell at the top left corner in the first table
    const cell = document.getElementById("table-" + tableNumber + "-row-" + (row + 1) + "-col-" + (col + 1));
    cell.setAttribute("class", "blue-background") // add a class of blue-background to the <td> tag

    const pTag = document.createElement("p"); // create a new <p> tag for the Log Section
    pTag.innerHTML = "Current sqaure " + (row + 1) + "," + (col + 1) + " on Board Number " + tableNumber; // add the contents of the <p> tag
    pTag.setAttribute("class", "blue-background normal-margin"); // add a class of blue-background to the <p> tag
    logSection.appendChild(pTag); // add the <p> tag to the Log Section

    // scroll to the bottom of the Log Section to see the new log
    scrollToBottom(logSection);
}


function removeSquareColor(row, col, tableNumber) {
    // get the table cell by it id Eg. id = "table-1-row-1-col-1" will get the cell at the top left corner in the first table
    const cell = document.getElementById("table-" + tableNumber + "-row-" + (row + 1) + "-col-" + (col + 1));
    cell.removeAttribute("class") // remove the class of blue-background from the <td> tag
}

function scrollToBottom(node) {
    node.scrollTop = node.scrollHeight;
}

export { markCurrentSqaureBlue, removeSquareColor }