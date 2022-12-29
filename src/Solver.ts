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
    this.beginGuessing();
  }

  beginGuessing() {
    let roundComplete: boolean = false;
    let guess: Word = new Word("");

    while (!roundComplete) {
      if (this.#tester.round === 6) {
        roundComplete = true;
        log(chalk.bgRed("FAIL"));
        break;
      }

      const clue: ClueList = this.makeGuess(guess);
      const clueResult: ClueResult = this.processClue(clue);

      switch (clueResult) {
        case ClueResult.SUCCESS:
          roundComplete = true;
          log(chalk.bgGreenBright("SUCCESS"));
          break;
        default:
          guess = this.makeNewGuess();
          break;
      }
    }
  }

  processClue(clue: ClueList): ClueResult {
    if (clue.filter((clue) => clue.color === Indicator.GREEN).length === 5) {
      return ClueResult.SUCCESS;
    }

    return ClueResult.FAIL;
  }

  resetWordList() {
    this.#wordLists.push(this.#wordList);
    this.#wordList = new WordList();
  }

  makeFirstGuess(): Word {
    return testWords[Math.floor(Math.random() * testWords.length)];
  }

  makeNewGuess(): Word {
    //TODO: dynamic strategy
    return this.makeFirstGuess();
  }

  makeGuess(guess: Word): ClueList {
    if (guess.isSet()) {
      return this.#tester.processGuess(guess);
    }

    return this.#tester.processGuess(this.makeFirstGuess());
  }
}
