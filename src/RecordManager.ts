import { Word, ClueList } from "./Word";
import { Record } from "./Record";

export type RecordList = Record[];

const getGuesses = (record: Record) =>
  record.success ? record.guesses.length : -1;
const isSuccess = (num: number) => num > 0;
const sum = (a: number, b: number) => a + b;

export class RecordManager {
  #history: RecordList = [];
  #currentRecord: Record = new Record();
  #iteration: number = 0;

  get history() {
    return this.#history;
  }

  newRecord(newWord: Word): void {
    this.addRecordToHistory();
    this.#currentRecord = new Record(newWord);
    this.#iteration++;
  }

  addGuessToRecord(clueList: ClueList): void {
    this.#currentRecord.addGuess(clueList);
  }

  recordSuccess(): void {
    this.#currentRecord.success = true;
  }

  recordFailure(): void {
    this.#currentRecord.success = false;
  }

  private addRecordToHistory(): void {
    this.#history.push(this.#currentRecord);
  }

  getAverageGuesses(): number {
    return (
      this.#history.map(getGuesses).filter(isSuccess).reduce(sum) /
      this.#history.length
    );
  }
}

const recordManager = new RecordManager();

export { recordManager };
