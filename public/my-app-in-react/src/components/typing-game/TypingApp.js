import React from 'react';
import './typingStyles.css'

let TypingApp = () => {

  let [gameRunning, setGameRunning] = React.useState(false);
  let [textValue, setTextValue] = React.useState("");
  let [timeRemaining, setTimeRemaining] = React.useState(5);
  let [totalWords, setTotalWords] = React.useState(0);

  let textareaInput = React.useRef(null); //UseRef para referenciar el objeto textarea y darle focus.

  let handleTextAreaChange = (event) => {
    if(gameRunning){
      setTextValue(event.target.value);
      setTotalWords(countWordNumber());
    }
  }

  let countWordNumber = () => {
    const wordsArr = textValue.trim().split(" ")
    return wordsArr.filter(word => word !== "").length
  }


  let startGame = () => {
    setTextValue("")
    setTotalWords(0);
    setGameRunning(true);
    setTimeRemaining(5);
    textareaInput.current.disabled = false;
    textareaInput.current.focus();
  }

  React.useEffect(() => {
      if(gameRunning && timeRemaining > 0) {
        setTimeout(() => {
          setTimeRemaining(time => time - 1)
        }, 1000)
      } else if(timeRemaining <= 0) {
        setGameRunning(false);
      }
  }, [timeRemaining, gameRunning]) //Aqui podemos escuchar 2 valores para realizar un useEffect

  return (
    <div>
    <h1>Typing Game by Padu</h1>
    <textarea ref={textareaInput} disabled={!gameRunning} className={gameRunning ? 'enabled' : 'disabled'} onChange={(ev) => handleTextAreaChange(ev)} value={textValue}></textarea>
    <h4>Time remaining: {timeRemaining}</h4>
    <button disabled={gameRunning} onClick={() => {startGame();}}>Empezar el juego</button>
    <h2>Cuenta de palabras: {totalWords}</h2>  
    </div>
    
  )
}

export default TypingApp

