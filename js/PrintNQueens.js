"use strict"

import addQueen from "./AddQueen.js"; // function to add the queenEmoji at the specified location on the chess board
import removeQueen from "./RemoveQueen.js"; // function to remove the queenEmoji at the specified location on the chess board
import cloneTableOfSizeN from "./CloneChessBoard.js"; // function to clone the last chess board in the N Queens Visualizer Section and display it
import generateTableOfSizeN from "./GenerateChessBoard.js"; // function to generate a chess board of size n x n
import { markCurrentSqaureBlue, removeSquareColor } from "./MarkCurrentSquare.js"


let countOfChessBoards = 1;

let animationsArr = new Array();

function setCountOfChessBoards(valueToSet) {
    countOfChessBoards = valueToSet;
}

function clearAnimationsArr() {
    animationsArr = new Array();
}

function getAnimationsArr(matrix, row) {
    printNQueens(matrix, row);
    return animationsArr;
}

function printNQueens(chess, row) {
    if (row == chess.length) {
        countOfChessBoards++;
        animationsArr.push([cloneTableOfSizeN, [chess.length, countOfChessBoards]])
        return;
    }

    // check if we can place the queen on each column of the current row
    for (let col = 0; col < chess.length; col++) {
        // check if the current cell is safe for the queen to be placed

        // add the animation function to mark the current row,col of the chess board as blue
        animationsArr.push([markCurrentSqaureBlue, [row, col, countOfChessBoards]]);

        if (chess[row][col] == 0 && isQueenSafe(chess, row, col) == true) {
            // place the queen in the chess array (cells with the queen are 1 and other cells i.e. empty cells are 0)
            chess[row][col] = 1;

            // add the animation function to mark the current row,col of the chess board as blue
            animationsArr.push([markCurrentSqaureBlue, [row, col, countOfChessBoards]]);

            // add the animation function to display the queenEmoji on the current row,col of the chess board
            animationsArr.push([addQueen, [row, col, countOfChessBoards]]);

            // add the animation function to remove the blue color from the current row,col of the chess board
            animationsArr.push([removeSquareColor, [row, col, countOfChessBoards]]);

            // we have placed a queen on the current row (i.e. chess[row][col] = 1;) and now we'll go to the next row
            printNQueens(chess, row + 1);

            // remove the previously placed queen after returning from the next row
            chess[row][col] = 0;
            // add the animation function to remove the queenEmoji on the current row,col of the chess board
            animationsArr.push([removeQueen, [row, col, countOfChessBoards]]);
        }

        // add the animation function to remove the blue color from the current row,col of the chess board
        animationsArr.push([removeSquareColor, [row, col, countOfChessBoards]]);
    }
}

function isQueenSafe(chess, row, col) {
    /** left diagonal 
      * check all the cells on the left diagonal only for rows above the current row as we have neither placed a queen on the current row nor the rows below
      */
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        // if there is a queen on the left diagonal, return false
        if (chess[i][j] == 1) {
            return false;
        }
    }

    /** vertically adjacent cells
      * check all the cells vertically above the current cell as we have neither placed a queen on the current row nor the rows below
      */
    for (let i = row - 1, j = col; i >= 0; i--) {
        // if there is a queen on any cell which is vertically above the current cell then return false
        if (chess[i][j] == 1) {
            return false;
        }
    }

    /** right diagonal
      * check all the cells on the right diagonal only for rows above the current row as we have neither placed a queen on the current row nor the rows below
      */
    for (let i = row - 1, j = col + 1; i >= 0 && j < chess.length; i--, j++) {
        // if there is a queen on the right diagonal, return false
        if (chess[i][j] == 1) {
            return false;
        }
    }

    // if the function has not reached this point, it means that it has not returned false i.e. the current cell is safe for the queen
    return true;
}

export { setCountOfChessBoards, clearAnimationsArr, getAnimationsArr };
