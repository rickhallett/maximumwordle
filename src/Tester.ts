export class Color {
  testWord(word: string): boolean {
    throw new Error("Not today boyo");
  }
}

// Unifying disparate types

class Green extends Color {
  constructor(private letter: string, private index: number) {
    super();
  }

  testWord(word: string): boolean {
    return this.letter === word[this.index];
  }
}

class Yellow extends Color {
  constructor(private letter: string, private index: number) {
    super();
  }

  testWord(word: string): boolean {
    return this.letter !== word[this.index] && word.includes(this.letter);
  }
}

class Grey extends Color {
  constructor(private letter: string) {
    super();
  }

  testWord(word: string): boolean {
    return !word.includes(this.letter);
  }
}

export class Tester {
  constructor(public gameword: string) {}

  provideClue(guess: string): Color[] {
    return guess.split("").map((char, index) => {
      if (Boolean(!this.gameword.includes(char))) {
        return new Grey(char);
      }

      if (Boolean(char === this.gameword[index])) {
        return new Green(char, index);
      }

      return new Yellow(char, index);
    });
  }
}
