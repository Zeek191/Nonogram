const BOARD = document.getElementById("board");
const ROWS = document.getElementById("rows");
const COLS = document.getElementById("cols");

export default class Board {
  cols: Array<number[]>;
  rows: Array<number[]>;

  constructor(cols: Array<number[]>, rows: Array<number[]>) {
    this.cols = cols;
    this.rows = rows;
  }

  private adjustBoard() {
    if (BOARD && COLS && ROWS) {
      BOARD.style.gridTemplateColumns = `repeat(${this.cols.length}, 1fr)`;
      BOARD.style.gridTemplateRows = `repeat(${this.rows.length}, 1fr)`;
      COLS.style.gridTemplateColumns = `repeat(${this.rows.length - 1}, 1fr)`;
      ROWS.style.gridTemplateRows = `repeat(${this.rows.length - 1}, 1fr)`;
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
        type === "col" ? transformedCell : cell
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

  public createBoard() {
    this.adjustBoard();
    this.fillBoardWithNumbers();
  }
}
