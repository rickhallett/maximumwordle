import chalk from "chalk";
import { log } from "console";
import { Clue, ClueList, Guess, Indicator, Word } from "./Word";

class Tester {
  #iteration: number = 0;
  #round: number = 0;
  #gameWord: Word = new Word("");
  #wordList: Word[] = [];
  #guessList: ClueList[] = [];

  get gameWord(): Word {
    if (this.#gameWord === null || !this.#gameWord.isSet()) {
      throw TypeError("Gameword must be set");
    }
    return this.#gameWord;
  }

  setWordList(wordList: Word[]) {
    this.#wordList = wordList;
  }

  setGameWord() {
    this.#gameWord =
      this.#wordList[Math.floor(Math.random() * this.#wordList.length)];
    this.#iteration++;
  }

  getGuessList(): ClueList[] {
    return this.#guessList;
  }

  getGuessListRound(round: number): ClueList {
    return this.#guessList[round - 1];
  }

  processGuess(guess: Word): void {
    this.#guessList.push(this.#gameWord.calculateClue(guess));
    this.#round++;
  }

  prettyPrintGuess(round: number): void {
    const format = {
      [Indicator.GREEN]: chalk.green,
      [Indicator.YELLOW]: chalk.yellow,
      [Indicator.GREY]: chalk.gray,
      [Indicator.HIDDEN_YELLOW]: chalk.gray,
    };
    const clueList = this.getGuessListRound(round);
    log(clueList.map((clue) => format[clue.color](clue.char)).join(""));
  }
}

const tester = new Tester();

export { tester };
