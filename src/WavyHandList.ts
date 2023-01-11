import fs from "fs";
import { Word } from "./Word";

export class WavyHandList {
  private file: string;
  private list: string[] | Word[];

  constructor(toWordOrNotToWord: boolean = true) {
    this.file = this.readFile("src/words.txt");
    this.list = toWordOrNotToWord ? this.createWordList() : this.createList();
  }

  private readFile(
    path: fs.PathOrFileDescriptor,
    encoding: fs.EncodingOption = "utf-8"
  ): string {
    const file: string | Buffer = fs.readFileSync(path, encoding);
    return file.toString();
  }

  private createWordList(separator: string = "\n"): Word[] {
    return this.file
      .split(separator)
      .map((word) => new Word(word.toUpperCase()));
  }

  private createList(separator: string = "\n"): string[] {
    return this.file.split(separator).map((word) => word.toUpperCase());
  }

  get words() {
    return this.list;
  }

  get length() {
    return this.list.length;
  }
}
