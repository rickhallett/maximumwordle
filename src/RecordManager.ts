import { Word, ClueList } from "./Word";
import { Record } from "./Record";

export type RecordList = Record[];

const getGuesses = (record) => (record.success ? record.guesses.length : -1);
const isSuccess = (num: number) => num > 0;
const sum = (a: number, b: number) => a + b;

export class RecordManager {
  #history: RecordList = [];
  #currentRecord: Record = new Record();

  newRecord(): void {
    this.addRecordToHistory();
    this.#currentRecord = new Record();
  }

  addGuessToRecord(clueList: ClueList): void {
    this.#currentRecord.addGuess(clueList);
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
