import { useState } from "react"
import Die from "./Die"

export default function Main(){

// Solution to generating 10 buttons and give the buttons a random value 
// between 1 and 6

// Solution 1

    // const generateAllDice = function (){
    //     return Math.floor((Math.random() * 6) + 1)
    // }

    // const randomNumbers = Array.from({length: 10}, generateAllDice)

// Solution 2

    // const generateAllDice = function (){
    //     return new Array(10)
    //         .fill(0)
    //         .map(() => Math.ceil(Math.random() * 6))
    // }

// Solution 3

    const generateAllDice = function (){
        const newDice = []
        for(let i = 0; i < 10; i++){
            const rand = Math.ceil(Math.random() * 6)
            newDice.push(rand)
        }
        return newDice
    }


    // Creating a state to hold the array of random numbers

    const [dice, setDice] = useState(generateAllDice())

    

    // Mapping on the new array to create the die component

    const diceElement = dice.map((num, index) => (
        <Die key={index} value={num}/>
    ))

    // Function to roll the dice and generate new num valus in the dice buttons
    const rollDice = function(){
        setDice(generateAllDice())
    }

    return(
        <div className="game-container">
            <div className="dice-container">
                {/* Display the Dice elements */}
                {diceElement}                   
            </div>
            <button className="roll-dice" onClick={rollDice}>Roll</button>
        </div>
    )
}