import { wordList } from "./WordList";
import { tester } from "./Tester";
import { Word } from "./Word";
import { log } from "console";

const allWords = wordList.list;
const testWords = [
  "hello",
  "world",
  "wordl",
  "codes",
  "doggo",
  "boyos",
  "happy",
  "drink",
  "foods",
  "bitty",
].map((w) => new Word(w));

wordList.createNewWordList(testWords);

tester.setWordList(wordList.list);
tester.setGameWord();

log("tester:gameword", tester.gameWord);

// tester.processGuess(new Word("world"));
// tester.processGuess(new Word("happy"));
// tester.processGuess(new Word("doggos"));
// tester.processGuess(new Word("boyos"));

testWords.map((word) => tester.processGuess(word));
// tester.prettyPrintGuess(1);
// tester.prettyPrintGuess(2);
// tester.prettyPrintGuess(3);
