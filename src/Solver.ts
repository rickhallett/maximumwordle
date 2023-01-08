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
    try {
      this.startRound();
    } catch (error) {
      log(chalk.red("Something occurred."));
    }
  }

  startRound() {
    let roundComplete: boolean = false;

    while (!roundComplete) {
      if (this.#tester.isGameOver()) {
        log(chalk.red("Better luck next time, boyo..."));
        roundComplete = true;
        this.#tester.recordFailure();
        this.resetWordList();
        return;
      }

      const guess = this.getGuess();
      const clue = this.#tester.processGuess(guess);

      if (this.isClueAllGreen(clue)) {
        log(chalk.greenBright("UBER BOYO!!!"));
        roundComplete = true;
        this.#tester.recordSuccess();
        this.resetWordList();
        // this.startRound();
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
          let skip = false;
          if (
            clue.filter((c) => c.color === Indicator.YELLOW && c.char === char)
              .length > 0
          ) {
            log(
              chalk.blueBright("grey could exist; skip remove on this basis")
            );
            skip = true;
          }

          if (
            clue.filter((c) => c.color === Indicator.GREEN && c.char === char)
              .length > 0
          ) {
            log(chalk.blueBright("grey could be green; skip!"));
            skip = true;
          }

          if (!skip) {
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
