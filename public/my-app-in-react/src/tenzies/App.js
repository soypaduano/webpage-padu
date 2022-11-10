import React from "react"
import Dice from './Dice.js'
import './styles.css'
import Confetti from 'react-confetti'
import { number } from "prop-types"

export default function App() {

    const numberOfDices = 5;

    let generateRandomNumber = () => {
        let randomNumbers = []
        for (let i = 0; i < numberOfDices; i++) randomNumbers.push(
            {
                value: Math.floor(Math.random() * 6) + 1,
                isHeld: false,
                id: i
            })
        return randomNumbers;
    }

    const [diceArray, setDiceArray] = React.useState(generateRandomNumber());
    const [tenzies, setTenzies] = React.useState(false);
    const [tries, setTries] = React.useState(0);


    let buttonRollDice = () => {
        console.log(tries);
        if(tenzies){
            setTenzies(false);
            setDiceArray(generateRandomNumber());
            setTries(0);
        } else {
            setTries(oldTries => oldTries + 1);
            setDiceArray(prevDiceArray => {
                return prevDiceArray.map(element => {
                    return !element.isHeld ?  {...element, value: Math.floor(Math.random() * 6) + 1} : element;            
                }) 
            });
        } 
    }


    let holdDice = (event, diceId) => {
        event.stopPropagation();
        setDiceArray(prevDiceArray => {
            return prevDiceArray.map(number => {
                return number.id === diceId ? {...number, isHeld: !number.isHeld} : number;                
            })
        })
    }

    let diceElements = diceArray.map(number => {
        return <Dice key={number.id} id={number.id} value={number.value} isHeld={number.isHeld} handleClick={holdDice} />
    })

    let checkWinning = () => {
        console.log("checking winning")
        const areHolds = diceArray.every(element => element.isHeld)
        const firstValue = diceArray[0].value;
        const sameValues = diceArray.every(element => element.value === firstValue);
        if(areHolds && sameValues) {
            setTenzies(true);
        }
    }

    React.useEffect(() => {
        checkWinning();
    }, [diceArray])

    return (
        <main>
            {tenzies && <Confetti/>}
            <h1>Tenzies Game</h1>
            <h3>
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </h3>
            <h5>Tries: {tries} </h5>
            <div className="dices-container">
                {diceElements}
            </div>
            <button onClick={() => buttonRollDice()}> {tenzies ? 'New game' : 'Roll'} </button>
        </main>
    )
}
