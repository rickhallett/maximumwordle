import { RecordManager } from "./RecordManager";
import { Tester } from "./Tester";
import { WordList } from "./WordList";
import { ClueList, Indicator, Word } from "./Word";
import { log } from "console";
import chalk from "chalk";

const testWords = [
  "hello",
  "world",
  "wordl",
  "codes",
  "doggo",
  "boyos",
  "happy",
  "drink",
  "foods",
  "bitty",
].map((w) => new Word(w));

export enum ClueResult {
  "SUCCESS",
  "FAIL",
}

/**
 * SOLUTION
 *
 * main while loop: while !round_complete, do
 *    if round === 6
 *        round_complete = true
 *        record failure
 *        restart()
 *
 *    guess = getGuess(round)
 *    clue = processGuess(guess)
 *
 *    if clue is all green
 *        record success
 *        restart()
 *
 *    message tester to restart
 *
 *
 * restart()
 *     message tester to reset
 *        tester resets itself/wordlist
 *
 * processGuess(guess)
 *    clue = tester.processGuess(guess)
 *    filterWordlist(clue)
 *    rtn clue
 *
 * getClue(guess)
 *    convert guess to clue object (position, char, color)
 *    return clue object
 *
 * filterWordlist(clue)
 *    filter wordlist to remove words containing gray letters
 *    filter wordlist to remove words not containing green letters
 *    filter wordlist to remove words that don't contain the correct number of yellow letters
 *
 * getGuess(round)
 *    if round === 0
 *        get initial guess (from configurable object?)
 *    else
 *        select a random word from filtered wordlist
 *
 *    rtn guess
 */

export class Solver {
  #tester: Tester;
  #wordList: WordList;
  #wordLists: WordList[] = [];

  constructor(tester: Tester, wordList: WordList) {
    this.#tester = tester;
    this.#wordList = wordList;
  }

  startGame() {
    this.#wordList.createNewWordList(testWords);
    this.#tester.setWordList(this.#wordList.list);
    this.#tester.setGameWord();
    this.startRound();
  }

  startRound() {
    let roundComplete: boolean = false;

    while (!roundComplete) {
      if (this.#tester.isGameOver()) {
        roundComplete = true;
        this.#tester.recordFailure();
        this.resetWordList();
      }

      const guess = this.getGuess();
      const clue = this.#tester.processGuess(guess);

      this.filterWordList(clue);

      if (this.isClueAllGreen(clue)) {
        roundComplete = true;
        this.#tester.recordSuccess();
      }
    }
  }

  filterWordList(clue: ClueList): void {
    this.removeWordsWithGreyLetters();
  }

  removeWordsWithGreyLetters(): void {
    //TODO: do a perf check: if slow, optimise by use
    this.#wordList.removeWords(
      this.#wordList.list.filter((word) =>
        this.#tester
          .getClueForWord(word)
          .filter((char) => char.char === Indicator.GREY)
      )
    );
  }

  keepWordsWithGreenLetters(): void {}

  keepWordsWithYellowLetters(letters: string[]) {}

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

  makeNewGuess(): Word {}
}
