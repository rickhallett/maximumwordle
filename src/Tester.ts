import chalk from "chalk";
import { log } from "console";
import { RecordManager } from "./RecordManager";
import { Clue, ClueList, Indicator, Word } from "./Word";

export enum Result {
  "SUCCESS",
  "FAIL",
}

export type EndIteration = {
  result: Result;
};

export const isEndIteration = (
  value: ClueList | EndIteration
): value is EndIteration => {
  if ((value as EndIteration).result) {
    return true;
  }

  return false;
};

export class Tester {
  console: boolean = false;
  #round: number = 0;
  #iteration: number = 0;
  #gameWord: Word = new Word("");
  #wordList: Word[] = [];
  #guessList: ClueList[] = [];
  #recordManager: RecordManager;

  constructor(recordManager: RecordManager) {
    this.#recordManager = recordManager;
  }

  get gameWord(): Word {
    if (this.#gameWord === null || !this.#gameWord.isSet()) {
      throw TypeError("Gameword must be set");
    }
    return this.#gameWord;
  }

  get recordManager(): RecordManager {
    return this.#recordManager;
  }

  get iteration(): number {
    return this.#iteration;
  }

  isGameOver(): boolean {
    return this.#round === 6;
  }

  isFirstRound(): boolean {
    return this.#round === 0;
  }

  isIterationLimit(): boolean {
    return this.#iteration > 2000;
  }

  isIterationInHundred(): boolean {
    return this.#iteration % 10 === 0;
  }

  setWordList(wordList: Word[]): void {
    this.#wordList = wordList;
  }

  setGameWord(): void {
    this.#gameWord =
      this.#wordList[Math.floor(Math.random() * this.#wordList.length)];
    this.#recordManager.newRecord(this.#gameWord);
    if (this.console)
      log(chalk.yellowBright("Gameword (hidden):", this.gameWord.value));
  }

  getGuessList(): ClueList[] {
    return this.#guessList;
  }

  getGuessListRound(round: number): ClueList {
    return this.#guessList[round - 1];
  }

  processGuess(guess: Word): ClueList {
    const clueList: ClueList = this.#gameWord.calculateClue(guess);

    this.#guessList.push(clueList);
    this.#recordManager.addGuessToRecord(clueList);
    this.#round++;
    this.prettyPrintGuess(this.#round);

    return clueList;
  }

  recordFailure(): void {
    this.#recordManager.recordFailure();
    this.nextIteration();
  }

  recordSuccess(): void {
    this.#recordManager.recordSuccess();
    this.nextIteration();
  }

  nextIteration(): void {
    this.#round = 0;
    this.#iteration++;
    this.setGameWord();
  }

  prettyPrintGuess(round: number): void {
    const format = {
      [Indicator.GREEN]: chalk.green,
      [Indicator.YELLOW]: chalk.yellow,
      [Indicator.GREY]: chalk.gray,
      [Indicator.HIDDEN_YELLOW]: chalk.gray,
    };
    const clueList = this.getGuessListRound(round);
    if (this.console)
      log(
        round,
        clueList.map((clue) => format[clue.color](clue.char)).join(" ")
      );
  }
}

const tester = new Tester(new RecordManager());

export { tester };
