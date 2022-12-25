import fs from "fs";
import { Word } from "./Word";

class WordList {
  #file: string = "";
  #list: Word[] = [];
  #listHistory: Word[][] = [];

  constructor(path: fs.PathOrFileDescriptor) {
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
    this.#list = this.#file.split(separator).map((word) => new Word(word));
  }

  createNewWordList(newWordList: Word[]): Word[] {
    this.#listHistory.push(this.#list.slice());
    this.#list = newWordList.slice() || this.#list.slice();
    return this.#list.slice();
  }

  getListIteration(): number {
    return this.#listHistory.length;
  }

  findWordsWith(letters: string): Word[] {
    return this.#list.filter((word) => word.includes(letters));
  }

  findWordCountWith(letters: string): number {
    return this.findWordsWith(letters).length;
  }

  findWordsWithout(letters: string): Word[] {
    return this.#list.filter((word) => !word.includes(letters));
  }

  findWordCountWithout(letters: string): number {
    return this.findWordsWithout(letters).length;
  }

  findWordsWithLetterAtIndex(letter: string, index: number): Word[] {
    return this.#list.filter((word) => word.getIndex(index) === letter);
  }

  findWordCountWithLetterAtIndex(letter: string, index: number): number {
    return this.findWordsWithLetterAtIndex(letter, index).length;
  }

  joinWordLists(wordLists: Word[][]): Word[] {
    let joined: Word[] = [];
    return joined.concat(...wordLists);
  }

  keepWordsWith(letters: string): void {
    this.createNewWordList(this.findWordsWith(letters));
  }

  removeWordsWith(letters: string) {
    this.createNewWordList(this.findWordsWithout(letters));
  }

  getWordListWithoutWords(words: Word[]): Word[] {
    return this.#list.filter((word) => !words.includes(word));
  }

  removeWords(words: Word[]): void {
    this.createNewWordList(this.getWordListWithoutWords(words));
  }
}

const wordList = new WordList("src/words.txt");

export { wordList };
