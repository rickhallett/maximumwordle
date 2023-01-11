import fs from "fs";

export class WordList {
  private file: string;
  public list: string[];

  constructor() {
    this.file = this.readFile("src/words.txt");
    this.list = this.createList();
  }

  private readFile(
    path: fs.PathOrFileDescriptor,
    encoding: fs.EncodingOption = "utf-8"
  ): string {
    const file: string | Buffer = fs.readFileSync(path, encoding);
    return file.toString();
  }

  private createList(separator: string = "\n"): string[] {
    return this.file.split(separator).map((word) => word.toUpperCase());
  }

  get length() {
    return this.list.length;
  }
}
