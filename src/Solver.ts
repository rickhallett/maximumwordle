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
    console.clear();
    // this.#wordList.createNewWordList(testWords);
    this.#tester.setWordList(this.#wordList.list);
    this.#tester.setGameWord();
    this.startRound();
  }

  startRound() {
    log("SR");
    let roundComplete: boolean = false;

    while (!roundComplete) {
      if (this.#tester.isGameOver()) {
        roundComplete = true;
        this.#tester.recordFailure();
        this.resetWordList();
        this.#tester.nextIteration();
        return;
      }

      const guess = this.getGuess();
      const clue = this.#tester.processGuess(guess);

      if (this.isClueAllGreen(clue)) {
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
    clue.forEach(({ position, char, color }, i) => {
      // log("list", this.#wordList.list);
      switch (color) {
        case Indicator.GREEN:
          // log("keep letter (g)", char, position);
          this.#wordList.keepByLetterIndex(char, position);
          break;
        case Indicator.GREY:
          // log("remove letter", char, position);
          this.#wordList.removeByLetterIndex(char, position);
          break;
        case Indicator.YELLOW:
          this.#wordList.keepWordsByAltLetterIndex(char, position);
          break;
        default:
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
    return this.#wordList.list[
      Math.floor(Math.random() * this.#wordList.list.length)
    ];
  }
}
