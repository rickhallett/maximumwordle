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

const mockGameWord = new Word("hello");
const mockGuessWord = new Word("world");

console.log(mockGameWord.calculateClue(mockGuessWord));
