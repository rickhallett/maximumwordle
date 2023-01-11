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
  const clues = tester.provideClue(getRandomWord(list));
  const filteredList = list.filter((word) =>
    clues.every((clue) => clue.testWord(word))
  );

  if (filteredList.length === 1) {
    return {
      solution: tester.gameword,
      guesses: iteration,
    };
  }

  return executeRound(tester, filteredList, ++iteration);
}

log(
  wordlist
    .map((word) => executeRound(new Tester(word), wordlist))
    .reduce((sum, record) => sum + record.guesses, 0) / wordlist.length
);
