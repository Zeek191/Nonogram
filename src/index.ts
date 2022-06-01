import Board from "./board";
import Game from "./game";
import { calculateCol, calculateRow } from "./numbers";

const DATA = [
  [true, true, true, true, true],
  [true, false, true, false, true],
  [false, false, true, true, true],
  [true, true, false, false, true],
  [false, false, false, false, false]
];

const game = new Game(DATA);
const board = new Board(calculateCol(DATA), calculateRow(DATA), game);

board.createBoard();
game.init();
