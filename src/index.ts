import { wordList } from "./WordList";
import { tester } from "./Tester";
import { Word } from "./Word";

const list = wordList.list;

wordList.createNewWordList(list.slice(0, 27));

// console.log(wordList.listHistory);

tester.setWordList(wordList.list);
tester.setGameWord();

// console.log(tester.gameWord);
// console.log(tester.processGuess(new Word("hello")));

const mockGameWord = new Word("dicks");
const mockGuessWord = new Word("wiscc");
console.log("game", mockGameWord.letters);
console.log("mock", mockGuessWord.letters);

console.log("clue", mockGameWord.calculateClue(mockGuessWord));
