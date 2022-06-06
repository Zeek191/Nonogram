const BOARD = document.getElementById("board");
const LIVES = document.getElementById("lives");
const RESULT = document.getElementById("result");
const RESET = document.getElementById("reset");

export default class Game {
  data: boolean[][];
  lives: number;
  possibleMoves: number;

  constructor(data: boolean[][]) {
    this.data = data;
    this.lives = 3;
    this.possibleMoves = 0;
  }

  private endGame() {
    const BUTTONS = document.querySelectorAll("button");

    BUTTONS.forEach((button) => {
      if (button.id !== "reset") button.disabled = true;
    });
  }

  private checkGameResult() {
    if (!RESULT) return null;

    if (this.lives === 0) {
      RESULT.innerHTML = `Result: You loosed`;
      return this.endGame();
    }

    if (this.possibleMoves === 0) {
      RESULT.innerHTML = `Result: You won!`;
      return this.endGame();
    }
  }

  private substractPossibleMoves() {
    return (this.possibleMoves -= 1);
  }

  private substractPlayerLives() {
    if (!LIVES) return null;
    this.lives -= 1;
    LIVES.innerHTML = `Lives: ${this.lives}`;
  }

  private calculatePossibleCellsCount() {
    return this.data.reduce((prevState, currentState) => {
      const amountOfCells = currentState.filter((cell) => !!cell).length;
      return prevState + amountOfCells;
    }, 0);
  }

  private createButton(state: boolean) {
    const button = document.createElement("button");
    button.addEventListener("click", () => {
      button.disabled = true;
      if (state) {
        button.style.backgroundColor = "black";
        this.substractPossibleMoves();
      } else {
        button.style.backgroundColor = "white";
        this.substractPlayerLives();
      }

      this.checkGameResult();
    });

    return button;
  }

  private renderButtons(data: boolean[][]) {
    const buttons = data.map((buttonsCollection) => {
      return buttonsCollection.map(this.createButton.bind(this));
    });

    return buttons;
  }

  public init() {
    this.possibleMoves = this.calculatePossibleCellsCount();
    const buttons = this.renderButtons(this.data);
    const resetButton = document.querySelector("#reset");

    resetButton?.addEventListener("click", () => {
      this.lives = 3;
      this.possibleMoves = this.calculatePossibleCellsCount();
      const boardButtons = BOARD?.querySelectorAll("button");
      boardButtons?.forEach((button) => {
        button.style.background = "buttonface";
        button.disabled = false;
      });
    });

    buttons.forEach((buttonsCollection) => {
      buttonsCollection.forEach((button) => {
        BOARD?.appendChild(button);
      });
    });
  }
}
