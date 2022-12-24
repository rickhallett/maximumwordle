import fs from "fs";

class WordList {
  #file: string = "";
  #list: string[] = [];
  #listHistory: string[][] = [];

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
    this.#list = this.#file.split(separator);
  }

  createNewWordList(newWordList: string[]): string[] {
    this.#listHistory.push(this.#list.slice());
    this.#list = newWordList.slice() || this.#list.slice();
    return this.#list.slice();
  }

  getListIteration(): number {
    return this.#listHistory.length;
  }

  findWordsWith(letters: string): string[] {
    return this.#list.filter((word) => word.includes(letters));
  }

  findWordCountWith(letters: string): number {
    return this.findWordsWith(letters).length;
  }

  findWordsWithout(letters: string): string[] {
    return this.#list.filter((word) => !word.includes(letters));
  }

  findWordCountWithout(letters: string): number {
    return this.findWordsWithout(letters).length;
  }

  findWordsWithLetterAtIndex(letter: string, index: number): string[] {
    return this.#list.filter((word) => word[index] === letter);
  }

  findWordCountWithLetterAtIndex(letter: string, index: number): number {
    return this.findWordsWithLetterAtIndex(letter, index).length;
  }

  joinWordLists(wordLists: string[][]): string[] {
    let joined: string[] = [];
    return joined.concat(...wordLists);
  }

  keepWordsWith(letters: string): void {
    this.createNewWordList(this.findWordsWith(letters));
  }

  removeWordsWith(letters: string) {
    this.createNewWordList(this.findWordsWithout(letters));
  }

  getWordListWithoutWords(words: string[]): string[] {
    return this.#list.filter((word) => !words.includes(word));
  }

  removeWords(words: string[]): void {
    this.createNewWordList(this.getWordListWithoutWords(words));
  }
}

const wordList = new WordList("src/words.txt");

export { wordList };
