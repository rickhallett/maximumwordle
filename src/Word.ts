import util, { deprecate } from "util";

export type Rarity = {
  char: string;
  val: number;
};

export type RarityList = Rarity[];

export enum Indicator {
  "GREEN" = "GREEN",
  "YELLOW" = "YELLOW",
  "GREY" = "GREY",
  "HIDDEN_YELLOW" = "HIDDEN_YELLOW",
}

export type Clue = {
  position: number;
  char: string;
  color: Indicator;
};

export type ClueList = Clue[];

export type Guess = {
  word: Word;
  clueList: ClueList;
};

export type GuessWordData = {
  position: number;
  char: string;
  color: Indicator | null;
};

export type NumberOfCharsInWord = {
  [key: string]: { original: number; found: number };
};
export class Word {
  #value: string = "";
  #letters: string[] = [];

  constructor(word: string) {
    this.#value = word;
    this.#letters = word.split("");
  }

  get value() {
    return this.#value;
  }

  get letters() {
    return this.#letters;
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

  private _getGuessWordData(guess: Word): GuessWordData[] {
    return guess.letters.map((char, position) => {
      const isGreen: boolean = Boolean(this.getIndex(position) === char);
      const isGrey: boolean = Boolean(!this.#letters.includes(char));

      if (isGreen || isGrey) {
        return {
          position,
          char,
          color: isGreen ? Indicator.GREEN : Indicator.GREY,
        };
      }

      return { position, char, color: Indicator.YELLOW };
    });
  }

  private _getNumberOfCharsInGameWord(): NumberOfCharsInWord {
    return this.#letters.reduce((store, char) => {
      return {
        ...store,
        [char]: {
          original: this.#letters.filter((l) => l === char).length,
          found: 0,
        },
      };
    }, {});
  }

  private _hideSurplusYellowClues(
    guessWordData: GuessWordData[],
    numberOfCharsInGameWord: NumberOfCharsInWord
  ): GuessWordData[] {
    return guessWordData.map((data, i) => {
      if (!this.#letters.includes(data.char)) {
        return data;
      }

      const og: number = numberOfCharsInGameWord[data.char].original;
      const inc: number = ++numberOfCharsInGameWord[data.char].found;

      if (inc > og) {
        return {
          ...data,
          color: Indicator.HIDDEN_YELLOW,
        };
      }

      return data;
    });
  }

  calculateClue(guess: Word): GuessWordData[] {
    return this._hideSurplusYellowClues(
      this._getGuessWordData(guess),
      this._getNumberOfCharsInGameWord()
    );
  }

  // getGreenLetters(guess: Word)

  hasGreenLetters(clueList: GuessWordData): boolean {
    return false;
  }

  getGreenLetterCount(clueList: GuessWordData): number {
    return 0;
  }

  hasYellowLetters(clueList: GuessWordData): boolean {
    return false;
  }

  getYellowLetterCount(clueList: GuessWordData): number {
    return 0;
  }

  hasGreyLetters(clueList: GuessWordData): boolean {
    return false;
  }

  getGreyLetterCount(clueList: GuessWordData): number {
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
