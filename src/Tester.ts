import { Word } from "./Word";

class Tester {
  #iteration: number = 0;
  #gameWord: Word = new Word("");
  #wordList: Word[] = [];

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
}

const tester = new Tester();

export { tester };
