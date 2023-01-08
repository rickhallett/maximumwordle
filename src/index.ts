import { Solver } from "./Solver";
import { tester } from "./Tester";
import { wordList } from "./WordList";

console.clear();

const solver = new Solver(tester, wordList);
solver.startGame();
