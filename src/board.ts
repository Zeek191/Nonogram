import Game from "./game";

const BOARD = document.getElementById("board");
const ROWS = document.getElementById("rows");
const COLS = document.getElementById("cols");

export default class Board {
  cols: Array<number[]>;
  rows: Array<number[]>;
  game: Game;

  constructor(
    cols: Array<number[]>,
    rows: Array<number[]>,
    gameServiceReference: Game
  ) {
    this.cols = cols;
    this.rows = rows;
    this.game = gameServiceReference;
  }

  private adjustBoard() {
    if (BOARD && COLS && ROWS) {
      BOARD.style.gridTemplateColumns = `repeat(${this.cols.length}, 1fr)`;
      BOARD.style.gridTemplateRows = `repeat(${this.rows.length}, 1fr)`;
      ROWS.style.gridTemplateRows = `repeat(${this.rows.length}, 1fr)`;
    }
  }

  private createBoardInformation(data: number[][]) {
    return data.map((collection) => {
      return collection.reduce((prevElement, currentElement) => {
        if (!prevElement) return currentElement;
        return prevElement + ` ${currentElement}`;
      }, "");
    });
  }

  private renderInformations(
    data: number[],
    parent: HTMLElement,
    type: "row" | "col"
  ) {
    data.forEach((cell) => {
      const informationContainer = document.createElement("p");
      const transformedCell =
        type === "col" && String(cell).length > 1
          ? String(cell)
              .split(" ")
              .map((cellValue) => `${cellValue} <br />`)
              .join(" ")
          : cell;

      informationContainer.innerHTML = `${
        type === "col" ? transformedCell : cell || 0
      }`;

      parent?.appendChild(informationContainer);
    });
  }

  private fillBoardWithNumbers() {
    if (BOARD && COLS && ROWS) {
      const rowInformation = this.createBoardInformation(this.rows);
      const colInformation = this.createBoardInformation(this.cols);
      this.renderInformations(rowInformation, ROWS, "row");
      this.renderInformations(colInformation, COLS, "col");
    }
  }

  private prepareBoard() {
    if (!BOARD) return null;
    BOARD.style.gridTemplateColumns = `repeat(${this.cols.length}, 1fr)`;
    BOARD.style.gridTemplateRows = `repeat(${this.rows.length}, 1fr)`;
  }

  public createBoard() {
    this.adjustBoard();
    this.fillBoardWithNumbers();
    this.prepareBoard();
  }
}
