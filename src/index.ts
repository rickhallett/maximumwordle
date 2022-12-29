import { Solver } from "./Solver";
import { tester } from "./Tester";
import { wordList } from "./WordList";

const solver = new Solver(tester, wordList);
solver.startGame();
