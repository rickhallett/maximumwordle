import { Word, ClueList } from "./Word";

export class Record {
  word: Word;
  success: boolean = false;
  guesses: ClueList[] = [];

  constructor(word: Word = new Word("")) {
    this.word = word;
  }

  addGuess(clueList: ClueList) {
    this.guesses.push(clueList);
  }
}
