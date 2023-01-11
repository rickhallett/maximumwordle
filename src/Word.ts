import util from "util";

export enum Indicator {
  "GREEN" = "GREEN",
  "YELLOW" = "YELLOW",
  "GREY" = "GREY",
  "HIDDEN_YELLOW" = "HIDDEN_YELLOW",
}

export class Word {
  value: string = "";
  letters: string[] = [];

  constructor(word: string) {
    this.value = word;
    this.letters = word.split("");
  }

  [util.inspect.custom]() {
    if (this.isSet()) {
      return this.value;
    }

    return null;
  }

  getIndex(index: number): string {
    return this.value[index];
  }

  includes(letters: string): boolean {
    return this.value.includes(letters);
  }

  isSet(): boolean {
    return Boolean(this.value.length);
  }
}
