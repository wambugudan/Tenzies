import { useEffect, useRef, useState } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function Main() {

    // Creating a ref variable to store the button to be focused on when the game is won
    const buttonRef = useRef(null)


    // Solution to generating 10 buttons and give the buttons a random value 
    // between 1 and 6

    // Solution 1

    // const generateAllDice = function (){
    //     return Math.floor((Math.random() * 6) + 1)
    // }

    // const randomNumbers = Array.from({length: 10}, generateAllDice)


    // Solution 3

    // const generateAllDice = function (){
    //     const newDice = []
    //     for(let i = 0; i < 10; i++){
    //         const rand = Math.ceil(Math.random() * 6)
    //         newDice.push(rand)
    //     }
    //     return newDice
    // }


    // Solution 2

    const generateAllDice = function () {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }



    // Creating a state to hold the array of random numbers
    // To ensure generateAllDice is not run on every roll, we use a call back function in the state initialization

    const [dice, setDice] = useState(() => generateAllDice())

    // Toggle the isHeld value

    const hold = function (id) {
        // console.log(id)
        setDice(prevState => (
            prevState.map(button =>
                button.id === id ?
                    { ...button, isHeld: !button.isHeld } : button
            )
        ))
    }

    // Mapping on the new array to load the die component

    const diceElement = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={hold}
            id={dieObj.id}
        />
    ))

    // Establish if game is won   
    const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)


    // Function to roll the dice and generate new num valus in the dice buttons
    const rollDice = function () {
        // check if game is won to determine function roll
        if (!gameWon) {
            setDice(prevState => prevState.map(btn =>
                btn.isHeld ?
                    btn : { ...btn, value: Math.ceil(Math.random() * 6) }
            ))
        } else {
            setDice(generateAllDice())
        }
    }


    // a useEffect to handle the focusing of the game to the new game button when game is won using the useRef
    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])




    return (
        <div className="game-container">
            {/* Display confetti on game win */}
            {gameWon && <Confetti />}

            {/* Message for screen readers when the game is won */}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p> Congratulations! You won.
                    Clickk on the "New Game" Button to play again</p>}
            </div>

            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it
                as its current value between rolls.
            </p>
            <div className="dice-container">
                {/* Display the Dice elements */}
                {diceElement}
            </div>
            <button
                className="roll-dice"
                // creating a ref on the button to the useRef variable
                ref={buttonRef}
                onClick={rollDice}
            >
                {gameWon ? "New Game" : "Roll"}
            </button>
        </div>
    )
}