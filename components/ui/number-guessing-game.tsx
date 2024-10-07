"use client";
import {useState , useEffect , ChangeEvent}  from "react";
import { Button } from "./button";
import { Input } from "./input";

//define type
// interface GuessingGame {
//     gameStart:boolean,
//     gameOver:boolean,
//     gamePause:boolean,
//     tagretNumber:number,
//     attempt:number,
//     userGuess:number|string
// }

export default function NumberGuessingGame(){
    //states
const [gameStart , setGameStart] = useState<boolean>(false);
const [gameOver , setGameOver] = useState<boolean>(false);
const [gamePause , setGamePause] = useState<boolean>(false);
const [targetNumber , setTargetNumber] = useState<number>(0);
const [attempt , setAttempt] = useState<number>(0);
const [userGuess , setUserGuess] = useState<number | string>("");


//create sideEffects for target Number
useEffect(()=>{
    if(userGuess && !gamePause){
        const generateTargetNumber:number = Math.floor(Math.random()*10)+1
        setTargetNumber(generateTargetNumber)
    }
} , [userGuess , gamePause])

//Handle Start Game
function handleStartGame(){
    setGameStart(true)
    setAttempt(0)
    setGamePause(false)
    setGameOver(false)  
}

//Handle Pause Game
function handlePauseGame(){
    setGamePause(true)
}
//Handle Resume Game
function handleResumeGame(){
    setGamePause(false)
}

//handle User Guess
const handleGuess = (): void => {
    if (typeof userGuess === "number" && userGuess === targetNumber) {
      setGameOver(true);
    } else {
      setAttempt(attempt + 1);
    }
  }

//handle Try Again
function handleTryAgain(){
    setGameStart(false)
    setGameOver(false)
    setUserGuess("")
    setAttempt(0)
}

//handle user guess change 
function handleUserGuessChange(e:ChangeEvent<HTMLInputElement>){
    setUserGuess(parseInt(e.target.value))
}





return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-black">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-black">
          Number Guessing Game
        </h1>
        <p className="text-center text-black mb-4">
          Try to guess the number between 1 and 10!
        </p>
        {!gameStart && (
          <div className="flex justify-center mb-4">
            <Button
              onClick={handleStartGame}
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Game
            </Button>
          </div>
        )}
        {gameStart && !gameOver && (
          <div>
            <div className="flex justify-center mb-4">
              {gamePause ? (
                <Button
                  onClick={handleResumeGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={handlePauseGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Pause
                </Button>
              )}
            </div>
            <div className="flex justify-center mb-4">
              <Input
                type="number"
                value={userGuess}
                onChange={handleUserGuessChange}
                className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs"
                placeholder="Enter your guess"
              />
              <Button
                onClick={handleGuess}
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Guess
              </Button>
            </div>
            <div className="text-center text-black">
              <p>Attempts: {attempt}</p>
            </div>
          </div>
        )}
        {gameOver && (
          <div>
            <div className="text-center mb-4 text-black">
              <h2 className="text-2xl font-bold">Game Over!</h2>
              <p>You guessed the number in {attempt} attempts.</p>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleTryAgain}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )};