import { log } from "console";
import { WordList } from "./WordList";
import { Tester } from "./Tester";

type Record = { solution: string; guesses: number };

const wordlist = new WordList().list;

function getRandomWord(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

function executeRound(
  tester: Tester,
  list: string[] = wordlist,
  iteration: number = 1
): Record {
  if (list.length === 1) {
    return {
      solution: tester.gameword,
      guesses: iteration,
    };
  }

  const clues = tester.provideClue(getRandomWord(list));
  const filteredList = list.filter((word) =>
    clues.every((clue) => clue.testWord(word))
  );

  return executeRound(tester, filteredList, ++iteration);
}

console.time("perf");

const wins = wordlist
  .map((word) => executeRound(new Tester(word), wordlist))
  .filter((record) => record.guesses <= 5);

const avg = wins.reduce((sum, record) => sum + record.guesses, 0) / wins.length;

log({ list: wordlist.length, wins: wins.length, avg });

console.timeEnd("perf");
