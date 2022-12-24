import { wordList } from "./WordList";

const list = wordList.list;
wordList.createNewWordList(list.slice(0, 27));
wordList.removeWordsWith("aa");
console.log(wordList.listHistory);
