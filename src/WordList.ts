import fs from "fs";
import _ from "lodash";
import { Word } from "./Word";

export class WordList {
  #file: string = "";
  #list: Word[] = [];
  #listHistory: Word[][] = [];

  constructor(path: fs.PathOrFileDescriptor = "src/words.txt") {
    console.clear();
    this.readFile(path);
    this.createWordList();
  }

  get list() {
    return this.#list.slice();
  }

  get listHistory() {
    const history = this.#listHistory.slice();
    history.push(this.#list);
    return history;
  }

  private readFile(
    path: fs.PathOrFileDescriptor,
    encoding: fs.EncodingOption = "utf-8"
  ): void {
    const file: string | Buffer = fs.readFileSync(path, encoding);
    this.#file = file.toString();
  }

  private createWordList(separator: string = "\n"): void {
    this.#list = this.#file
      .split(separator)
      .map((word) => new Word(word.toUpperCase()));
  }

  createNewWordList(newWordList: Word[]): Word[] {
    this.#listHistory.push(this.#list.slice());
    this.#list = newWordList.slice() || this.#list.slice();
    return this.#list.slice();
  }

  getListIteration(): number {
    return this.#listHistory.length;
  }

  keepWords(words: Word[]): void {
    this.createNewWordList(this.getWordListWithWords(words));
  }

  removeWords(words: Word[]): void {
    this.createNewWordList(this.getWordListWithoutWords(words));
  }

  removeByLetterIndex(letter: string, index: number): void {
    this.removeWords(this.findWordsWithLetterAtIndex(letter, index));
  }

  findWordsByAltLetterIndex(letter: string, pos: number): Word[] {
    return this.#list.filter((word) => {
      word.letters.forEach((char, i) => {
        if (char === letter && i === pos) {
          return false;
        }

        if (char === letter && i !== pos) {
          return true;
        }

        console.log({ char, letter, i, pos });

        console.log("you should never see this log.");
      });
    });
  }

  keepWordsByAltLetterIndex(letter: string, index: number): void {
    this.keepWords(this.findWordsByAltLetterIndex(letter, index));
  }

  findWordsWithLetterAtIndex(letter: string, index: number): Word[] {
    return this.#list.filter((word) => word.getIndex(index) === letter);
  }

  getWordListWithWords(words: Word[]): Word[] {
    return this.#list.filter((word) => words.includes(word));
  }

  getWordListWithoutWords(words: Word[]): Word[] {
    return this.#list.filter((word) => !words.includes(word));
  }
}

const wordList = new WordList();

export { wordList };

// removeWordsByAltLetterIndex(letter: string, index: number): void {
//   this.removeWords(this.findWordsByAltLetterIndex(letter, index));
// }

// keepByLetterIndex(letter: string, index: number): void {
//   this.keepWords(this.findWordsWithLetterAtIndex(letter, index));
// }

// findWordsWith(letters: string): Word[] {
//   return this.#list.filter((word) => word.includes(letters));
// }

// findWordCountWith(letters: string): number {
//   return this.findWordsWith(letters).length;
// }

// findWordsWithout(letters: string): Word[] {
//   return this.#list.filter((word) => !word.includes(letters));
// }

// findWordCountWithout(letters: string): number {
//   return this.findWordsWithout(letters).length;
// }

// findWordCountWithLetterAtIndex(letter: string, index: number): number {
//   return this.findWordsWithLetterAtIndex(letter, index).length;
// }

// findWordsWithIntersection(listA: string[], listB: string[]) {
//   return _.intersection(listA, listB);
// }

// joinWordLists(wordLists: Word[][]): Word[] {
//   let joined: Word[] = [];
//   return joined.concat(...wordLists);
// }

// keepWordsWith(letters: string): void {
//   this.createNewWordList(this.findWordsWith(letters));
// }

// removeWordsWith(letters: string) {
//   this.createNewWordList(this.findWordsWithout(letters));
// }
