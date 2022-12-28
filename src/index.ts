import { wordList } from "./WordList";
import { tester } from "./Tester";
import { Word } from "./Word";
import { log } from "console";

const allWords = wordList.list;
const testWords = ["hello", "world", "wordl", "codes", "doggo", "boyos"].map(
  (w) => new Word(w)
);

wordList.createNewWordList(testWords);

tester.setWordList(wordList.list);
tester.setGameWord();

log("tester:gameword", tester.gameWord);

const mockGuessWord = new Word("world");

tester.processGuess(mockGuessWord);
tester.prettyPrintGuess(1);
