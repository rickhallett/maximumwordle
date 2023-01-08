import { RecordManager } from "./RecordManager";
import { Tester } from "./Tester";
import { WordList } from "./WordList";
import { ClueList, Indicator, Word } from "./Word";
import { log } from "console";
import chalk from "chalk";

const testWords = ["hello", "world"].map((w) => new Word(w));

export enum ClueResult {
  "SUCCESS",
  "FAIL",
}

export class Solver {
  console: boolean = false;
  #tester: Tester;
  #wordList: WordList;
  #wordLists: WordList[] = [];

  constructor(tester: Tester, wordList: WordList) {
    this.#tester = tester;
    this.#wordList = wordList;
  }

  startGame() {
    this.#tester.setWordList(this.#wordList.list);
    this.#tester.setGameWord();
    this.startRound();
  }

  startRound() {
    if (this.#tester.isIterationLimit()) {
      log(chalk.bgWhite("Simulation complete."));
      log(
        "Avg:",
        this.#tester.recordManager.history.reduce(
          (sum, { guesses }) => (sum += guesses.length),
          0
        ) / this.#tester.recordManager.history.length
      );
      log(
        "% win:",
        (this.#tester.recordManager.history.filter((r) => r.success).length /
          this.#tester.recordManager.history.length) *
          100
      );
      process.exit();
    }

    if (this.#tester.isIterationInHundred()) {
      log(chalk.bgGrey("Loading...", this.#tester.iteration));
    }

    // log(chalk.bgGrey("Simulation starting..."));

    let roundComplete: boolean = false;

    while (!roundComplete) {
      if (this.#tester.isGameOver()) {
        if (this.console) log(chalk.red("Better luck next time, boyo..."));
        roundComplete = true;
        this.#tester.recordFailure();
        this.resetWordList();
        this.startRound();
        return;
      }

      const guess = this.getGuess();
      const clue = this.#tester.processGuess(guess);

      if (this.isClueAllGreen(clue)) {
        if (this.console) log(chalk.greenBright("UBER BOYO!!!"));
        roundComplete = true;
        this.#tester.recordSuccess();
        this.resetWordList();
        this.startRound();
        return;
      }

      this.filterWordList(clue);
    }
  }

  filterWordList(clue: ClueList): void {
    clue?.forEach(({ position, char, color }, i) => {
      switch (color) {
        case Indicator.GREEN:
          this.#wordList.keepByLetterIndex(char, position);
          break;
        case Indicator.GREY:
          if (!this.shouldSkip(clue, char)) {
            this.#wordList.removeWordsWith(char);
          }
          break;
        case Indicator.YELLOW:
          this.#wordList.keepWordsByAltLetterIndex(char, position);
          break;
        default:
          log(color);
          throw new Error("Unknown Indicator");
      }
    });
  }

  getGuess() {
    if (this.#tester.isFirstRound()) {
      return new Word("ADIEU");
    }

    return this.chooseRandomWordFromList();
  }

  shouldSkip(clue: ClueList, char: string): boolean {
    return (
      this.clueHasCharAsGreen(clue, char) ||
      this.clueHasCharAsYellow(clue, char)
    );
  }

  clueHasCharAsYellow(clue: ClueList, char: string): boolean {
    return (
      clue.filter((c) => c.color === Indicator.YELLOW && c.char === char)
        .length > 0
    );
  }

  clueHasCharAsGreen(clue: ClueList, char: string): boolean {
    return (
      clue.filter((c) => c.color === Indicator.GREEN && c.char === char)
        .length > 0
    );
  }

  isClueAllGreen(clue: ClueList) {
    return clue.every((char) => char.color === Indicator.GREEN);
  }

  resetWordList() {
    this.#wordLists.push(this.#wordList);
    this.#wordList = new WordList();
  }

  chooseRandomWordFromList(): Word {
    const newWord =
      this.#wordList.list[
        Math.floor(Math.random() * this.#wordList.list.length)
      ];

    return newWord;
  }
}
