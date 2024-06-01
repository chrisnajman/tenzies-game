import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Layout from "./layout/Layout"
import Die from "./components/game/Die"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(tenRandomNumbers())
  const [gameStatus, setGameStatus] = useState(false)

  useEffect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld)
    const firstDie = dice[0]
    const sameValues = dice.every((die) => firstDie.value === die.value)
    if (allDiceHeld && sameValues) {
      setGameStatus(true)
    }
  }, [dice])

  function createNewDice() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() }
  }

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

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  function tenRandomNumbers() {
    const arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(createNewDice())
    }
    return arr
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
        svgIndex={`${die.value - 1}`}
      />
    )
  })

  return (
    <>
      {gameStatus && <Confetti />}
      <Layout>
        <div className="game">
          <p>
            Roll until all dice are the same. Click any die to freeze it at its
            current value between rolls. Click again to unfreeze it.
          </p>

          <div className="game--grid">{diceElements}</div>
          <footer className="game--footer">
            <button
              type="button"
              onClick={rollDice}
            >
              {gameStatus ? "New game" : "Roll"}
            </button>
          </footer>
        </div>
      </Layout>
    </>
  )
}

export default App
