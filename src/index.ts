import { log } from "console";
import { WavyHandList } from "./WavyHandList";

const toWordOrNotToWord = false;
const wordlist = new WavyHandList(toWordOrNotToWord);

log(wordlist.words);
