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
    return this.#listHistory.slice();
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
    this.#listHistory.push(this.#list);
    this.#list = newWordList.slice() || this.#list.slice();
    return this.#list.slice();
  }

  getListIteration(): number {
    return this.#listHistory.length;
  }
}

const wordList = new WordList("src/words.txt");

export { wordList };
