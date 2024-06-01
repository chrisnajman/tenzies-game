# Tenzies Game

Interactive dice game, built followng the Scrimba React Tutorial [Tenzies Game (registration required)](https://v2.scrimba.com/learn-react-c0e/~052).

## Functionality

1. Roll all dice on clicking "Roll" button.
2. Freeze a die on clicking it.
3. On game completion:
   - Change the button text from "Roll" to "New game".
   - Launch confetti.
   - On clicking "New game", roll a set of new dice,
     - Hide confetti.

---

## Accessibility

- Fully keyboard navigable.
- SVG dice images:
  - have the `aria-hidden="true"` property, so are inaccessible to screen readers (but not to search engines).
  - corresponding number `span` wrappers have `className="visually-hidden`, so are only accessible to screen readers (and also to search engines).

## Code Note

### My Initial Version of `rollDice()`

```jsx
function rollDice() {
  setDice((prevDice) =>
    prevDice.map((die) => {
      return die.isHeld ? die : createNewDice()
    })
  )

  const allDiceHeld = dice.every((die) => die.isHeld)
  const firstDie = dice[0]
  const sameValues = dice.every((die) => firstDie.value === die.value)
  if (allDiceHeld && sameValues) {
    setGameStatus(false)
    setDice(tenRandomNumbers)
  }
}
```

### Final (Tutorial) Version

```jsx
function rollDice() {
  if (!gameStatus) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld ? die : createNewDice()
      })
    )
  } else {
    setGameStatus(false)
    setDice(tenRandomNumbers())
  }
}
```

Both work, but (obviously) the second version is more succinct.

---

## Testing

Tested on Windows 10 with:

- Chrome
- Firefox
- Microsoft Edge

Page tested in both browser and device views.
