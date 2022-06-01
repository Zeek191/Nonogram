import Board from "./board";
import { calculateCol, calculateRow } from "./numbers";

const DATA = [
  [true, true, true, true, true],
  [true, false, true, false, true],
  [false, false, true, true, true],
  [true, true, false, false, true],
  [false, false, false, false, false]
];

const board = new Board(calculateCol(DATA), calculateRow(DATA));
board.createBoard();
