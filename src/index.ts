import { wordList } from "./WordList";
import { tester } from "./Tester";

const list = wordList.list;

wordList.createNewWordList(list.slice(0, 27));

console.log(wordList.listHistory);

tester.setWordList(wordList.list);
tester.setGameWord();

console.log(tester.gameWord);
