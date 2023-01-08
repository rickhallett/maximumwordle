import { Word } from "../src/Word";
import { WordList } from "../src/WordList";

const mockWords = ['ubers', 'boyos', 'slams', 'cokes'].map(word => new Word(word))

describe('WordList', () => {
  it('initialises correctly', () => {
    const wordlist = new WordList();
    expect(wordlist.list.length).toBeGreaterThan(0)
  });

  it('can keep words by letter index', () => {
    const wordlist = new WordList();
    wordlist.createNewWordList(mockWords);
    wordlist.keepByLetterIndex('u',0)
    expect(wordlist.list.length).toBe(1)
  })

  it('can remove words that contain characters', () => {
    const wordlist = new WordList();
    wordlist.createNewWordList(mockWords); 
    wordlist.removeWordsWith('u');
    expect(wordlist.list.length).toBe(3)
  })

  it('can find words by alt letter index', () => {
    const wordlist = new WordList();
    wordlist.createNewWordList(mockWords);
    const words = wordlist.findWordsByAltLetterIndex('s',4)
    console.log(words)
  })
})