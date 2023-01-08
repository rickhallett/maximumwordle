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
  #tester: Tester;
  #wordList: WordList;
  #wordLists: WordList[] = [];

  constructor(tester: Tester, wordList: WordList) {
    this.#tester = tester;
    this.#wordList = wordList;
  }

  startGame() {
    // this.#wordList.createNewWordList(testWords);
    this.#tester.setWordList(this.#wordList.list);
    this.#tester.setGameWord();
    this.startRound();
  }

  startRound() {
    let roundComplete: boolean = false;

    while (!roundComplete) {
      if (this.#tester.isGameOver()) {
        log(chalk.red("Better luck next time, boyo..."));
        roundComplete = true;
        this.#tester.recordFailure();
        this.resetWordList();
        this.#tester.nextIteration();
        return;
      }

      const guess = this.getGuess();
      const clue = this.#tester.processGuess(guess);

      if (this.isClueAllGreen(clue)) {
        log(chalk.greenBright("UBER BOYO!!!"));
        roundComplete = true;
        this.#tester.recordSuccess();
        this.resetWordList();
        this.#tester.nextIteration();
        return;
      }

      this.filterWordList(clue, guess);
    }
  }

  filterWordList(clue: ClueList, guess: Word): void {
    clue?.forEach(({ position, char, color }, i) => {
      switch (color) {
        case Indicator.GREEN:
          this.#wordList.keepByLetterIndex(char, position);
          break;
        case Indicator.GREY:
          this.#wordList.removeWordsWith(char);
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

  isClueAllGreen(clue: ClueList) {
    return clue.every((char) => char.color === Indicator.GREEN);
  }

  resetWordList() {
    this.#wordLists.push(this.#wordList);
    this.#wordList = new WordList();
  }

  chooseRandomWordFromList(): Word {
    log("list length", this.#wordList.list.length);
    const newWord =
      this.#wordList.list[
        Math.floor(Math.random() * this.#wordList.list.length)
      ];

    log("new word:", newWord);

    return newWord;
  }
}
