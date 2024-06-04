import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Layout from "./layout/Layout"
import Die from "./components/game/Die"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(tenRandomNumbers())
  const [gameStatus, setGameStatus] = useState(false)
  const [numRolls, setNumRolls] = useState(0)
  const [lowestNumRolls, setLowestNumRolls] = useState(
    () => JSON.parse(localStorage.getItem("tenzies-game-rolls")) || []
  )

  useEffect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld)
    const firstDie = dice[0]
    const sameValues = dice.every((die) => firstDie.value === die.value)

    if (allDiceHeld && sameValues && !gameStatus) {
      setGameStatus(true)
      const newLowestNumRolls = [...lowestNumRolls, numRolls]
      setLowestNumRolls(newLowestNumRolls)
      localStorage.setItem(
        "tenzies-game-rolls",
        JSON.stringify(newLowestNumRolls)
      )
    }

    if (allDiceHeld && !sameValues && !gameStatus) {
      alert(
        "The dice values aren't the same! Unfreeze some to continue the game."
      )
    }
  }, [dice, gameStatus, lowestNumRolls, numRolls])

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
      setNumRolls((prevNumRolls) => prevNumRolls + 1)
    } else {
      setGameStatus(false)
      setDice(tenRandomNumbers())
      setNumRolls(0)
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
            <p>
              <span>Number of rolls:</span> <span>{numRolls}</span>
            </p>
            <table>
              <tbody>
                <tr>
                  <th scope="row">No. Games Played</th>
                  <td>
                    {lowestNumRolls.length > 0 ? lowestNumRolls.length : 0}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Best (lowest) score</th>
                  <td>
                    {lowestNumRolls.length > 1
                      ? Math.min(...lowestNumRolls)
                      : "n/a"}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Worst (highest) score</th>
                  <td>
                    {lowestNumRolls.length > 1
                      ? Math.max(...lowestNumRolls)
                      : "n/a"}
                  </td>
                </tr>
              </tbody>
            </table>
          </footer>
        </div>
      </Layout>
    </>
  )
}

export default App
