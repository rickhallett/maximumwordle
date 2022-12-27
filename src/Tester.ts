import { Clue, ClueList, Guess, Word } from "./Word";

class Tester {
  #iteration: number = 0;
  #round: number = 0;
  #gameWord: Word = new Word("");
  #wordList: Word[] = [];
  #clueList: ClueList = [];
  #guessList: Guess[] = [];

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

  getClueList(index: number): ClueList | Clue {
    if (index) {
      return this.#clueList[index];
    }
    return this.#clueList;
  }

  processGuess(guess: Word) {
    let clues: Clue[] = [];
  }
}

const tester = new Tester();

export { tester };
