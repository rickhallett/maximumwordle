import { log } from "console";
import fs from "fs";
import _ from "lodash";
import { Word } from "./Word";

export class WordList {
  #file: string = "";
  #list: Word[] = [];
  #listHistory: Word[][] = [];

  constructor(path: fs.PathOrFileDescriptor = "src/reduced_words.txt") {
    this.readFile(path);
    this.createWordList();
  }

  get list() {
    return this.#list.slice();
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
    this.#list = newWordList.slice();
    return this.#list.slice();
  }

  getListIteration(): number {
    return this.#listHistory.length;
  }

  keepByLetterIndex(letter: string, index: number): void {
    this.createNewWordList(this.findWordsWithLetterAtIndex(letter, index));
  }

  removeWordsWith(letters: string) {
    this.createNewWordList(
      this.#list.filter((word) => !word.includes(letters))
    );
  }

  findWordsByAltLetterIndex(letter: string, pos: number): Word[] {
    return this.#list.filter((word) => {
      let rtn = false;

      let idx = 0;
      for (let char of word.letters) {
        if (char === letter && idx === pos) {
          rtn = false;
          break;
        }

        if (char === letter && idx !== pos) {
          rtn = true;
          break;
        }
        idx++;
      }

      return rtn;
    });
  }

  keepWordsByAltLetterIndex(letter: string, index: number): void {
    this.createNewWordList(this.findWordsByAltLetterIndex(letter, index));
  }

  findWordsWithLetterAtIndex(letter: string, index: number): Word[] {
    return this.#list.filter((word) => word.getIndex(index) === letter);
  }
}

const wordList = new WordList();

export { wordList };
