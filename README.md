# Maximum Wordle: Node Edition

## TODO

## Optimisations
1) Are there more efficient ways of finding multiple items within a list?
2) What is faster, `for` or `forEach`?
3) Is there a trade off between operating on a list of strings, or a list of objects representing those strings, that itself has helper methods on?

## Ideas
1) Handle all wordlist operations on array copies to prevent state mutation bugs

### Reflections

1. Coding optimisitically (ie not YAGNI) was fun, felt like progress, but in many ways made it more difficult to develop the more complex algortihms later on. I hamstringed myself as much as helped myself
2. Its hard to decide what class should have responsibility for what sometimes. Should it be the Solver that filters wordlists, or should the WordList provide all these helper operations in abstraction?
3. Its a wrestle to decide when a chain of operations can be wrapped in successive function calls, or if these should all be split out into named functions. When is too much, too much?