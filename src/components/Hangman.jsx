 import React, { useState, useEffect } from "react";
 import { Link } from "react-router-dom";

const wordsWithHints = [
  
  { word: "react", hint: "A JavaScript library for building UIs" },
  {word:"jeyasutha",hint:"insta celibrity"},
  { word: "javascript", hint: "The main language of the web" },
  { word: "hangman", hint: "A word guessing game" },
  { word: "vite", hint: "A fast front-end build tool" },
  { word: "frontend", hint: "The visible part of a website" },
];

export default function Hangman() {
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [guessed, setGuessed] = useState([]);
  const [wrong, setWrong] = useState(0);
  const [score, setScore] = useState(
    () => JSON.parse(localStorage.getItem("hangmanScore")) || 0
  );
  const [hintUsed, setHintUsed] = useState(false);
  const maxWrong = 6;

  useEffect(() => {
    localStorage.setItem("hangmanScore", JSON.stringify(score));
  }, [score]);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const random = wordsWithHints[Math.floor(Math.random() * wordsWithHints.length)];
    setWord(random.word);
    setHint(random.hint);
    setGuessed([]);
    setWrong(0);
    setHintUsed(false);
    setShowHint(false);
  };

  const handleGuess = (letter) => {
    if (guessed.includes(letter)) return;

    setGuessed([...guessed, letter]);
    if (!word.includes(letter)) {
      setWrong(wrong + 1);
    } else if (
      word.split("").every((l) => guessed.includes(l) || l === letter)
    ) {
      setScore(score + 1);
    }
  };

  const clearScore = () => {
    localStorage.removeItem("hangmanScore");
    setScore(0);
  };

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const isWinner = word && word.split("").every((l) => guessed.includes(l));
  const isLoser = wrong >= maxWrong;

  const handleShowHint = () => {
    setShowHint(true);
    setHintUsed(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-500 text-white px-4">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 text-center border border-white/20">
        <h1 className="text-3xl font-extrabold mb-4 text-yellow-300">🎯 Hangman</h1>
        <p className="text-lg mb-2">
          Guess the hidden word before <span className="text-red-300">6</span> wrong guesses!
        </p>

        {/* Word Display */}
        <div className="text-2xl font-mono tracking-widest mb-4">
          {word.split("").map((l, i) => (
            <span key={i} className="inline-block w-6 mx-1 border-b-2 border-white">
              {guessed.includes(l) || isLoser ? l : "_"}
            </span>
          ))}
        </div>

        {/* Hint Section */}
        <div className="mt-2">
          {!showHint && !hintUsed && (
            <button
              onClick={handleShowHint}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105"
            >
              💡 Show Hint
            </button>
          )}
          {showHint && (
            <p className="mt-3 italic text-yellow-300">Hint: {hint}</p>
          )}
        </div>

        {/* Wrong Guess Count */}
        <p className="text-lg mt-4 mb-4">
          ❌ Wrong guesses: <span className="font-bold text-red-400">{wrong}</span> / {maxWrong}
        </p>

        {/* Alphabet Buttons */}
        <div className="grid grid-cols-7 gap-2 justify-center">
          {alphabet.map((l) => (
            <button
              key={l}
              onClick={() => handleGuess(l)}
              disabled={guessed.includes(l) || isWinner || isLoser}
              className={`w-8 h-8 rounded-md font-bold uppercase transition-all ${
                guessed.includes(l)
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Game State Messages */}
        <div className="mt-6">
          {isWinner && (
            <p className="text-green-400 font-bold text-xl">🎉 You Won! The word was "{word}"</p>
          )}
          {isLoser && (
            <p className="text-red-400 font-bold text-xl">💀 You Lost! The word was "{word}"</p>
          )}
        </div>

        {/* Control Buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={startNewGame}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105"
          >
            🔄 New Game
          </button>
          <button
            onClick={clearScore}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105"
          >
            🗑️ Clear Score
          </button>
        </div>

        {/* Scoreboard */}
        <div className="mt-6 text-lg font-bold">
          <p>🏆 Score: <span className="text-yellow-300">{score}</span></p>
        </div>
      </div>
      {/* Optional Home Link */}
      <Link
        to="/"
        className="relative z-10 mt-4 text-blue-200 hover:text-white hover:underline transition-all"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
}
