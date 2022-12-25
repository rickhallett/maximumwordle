import util from "util";

export type Rarity = {
  char: string;
  val: number;
};

export type RarityList = Rarity[];

export enum Indicator {
  "GREY",
  "YELLOW",
  "GREEN",
}

export type Clue = {
  char: string;
  color: Indicator;
  index: number;
};

export type ClueList = Clue[];

export class Word {
  #value: string = "";

  constructor(word: string) {
    this.#value = word;
  }

  get value() {
    return this.#value;
  }

  [util.inspect.custom]() {
    return this.#value;
  }

  getIndex(index: number): string {
    return this.#value[index];
  }

  includes(letters: string): boolean {
    return this.#value.includes(letters);
  }

  isSet(): boolean {
    return Boolean(this.#value.length);
  }

  hasGreenLetters(clueList: ClueList): boolean {
    return false;
  }

  getGreenLetterCount(clueList: ClueList): number {
    return 0;
  }

  hasYellowLetters(clueList: ClueList): boolean {
    return false;
  }

  getYellowLetterCount(clueList: ClueList): number {
    return 0;
  }

  hasGreyLetters(clueList: ClueList): boolean {
    return false;
  }

  getGreyLetterCount(clueList: ClueList): number {
    return 0;
  }

  getLetterRarityScore(wordList: string[]): number {
    // return numeric value for sorting lists
    // Rarity passed in as this will be dynamic depending on list
    const rarity: RarityList = this.computeNewRarityValues(wordList);
    return 0;
  }

  computeNewRarityValues(wordList: string[]): RarityList {
    // const r = wordList.map(word => )
    return [];
  }
}
