 import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function TicTacToe() {
  const [mode, setMode] = useState(null); // "single" or "multi"
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState(
    () => JSON.parse(localStorage.getItem("ticTacToeScore")) || { X: 0, O: 0 }
  );

  // Save score persistently
  useEffect(() => {
    localStorage.setItem("ticTacToeScore", JSON.stringify(score));
  }, [score]);

  // Handle AI move if single-player mode
  useEffect(() => {
    if (mode === "single" && !xIsNext && !winner) {
      const emptyIndexes = board
        .map((v, i) => (v === null ? i : null))
        .filter((i) => i !== null);
      if (emptyIndexes.length > 0) {
        const randomIndex =
          emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
        setTimeout(() => handleClick(randomIndex), 600);
      }
    }
  }, [xIsNext, board, winner, mode]);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      setScore({ ...score, [win]: score[win] + 1 });
    } else if (!newBoard.includes(null)) {
      setWinner("Draw");
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const calculateWinner = (b) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b1, c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  const clearScore = () => {
    localStorage.removeItem("ticTacToeScore");
    setScore({ X: 0, O: 0 });
  };

  const backToMenu = () => {
    resetGame();
    setMode(null);
  };

  // === UI ===
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white px-4">
      {/* MODE SELECTION */}
      {!mode && (
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-80 text-center border border-white/20">
          <h1 className="text-3xl font-extrabold mb-6 text-yellow-300">
            🎮 Tic Tac Toe
          </h1>
          <p className="mb-6 font-semibold text-white/80">
            Choose a game mode:
          </p>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => setMode("single")}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105"
            >
              🤖 Single Player
            </button>
            <button
              onClick={() => setMode("multi")}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105"
            >
              👫 Two Player
            </button>
          </div>
        </div>
      )}

      {/* GAME BOARD */}
      {mode && (
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-80 text-center border border-white/20">
          <h2 className="text-2xl font-extrabold mb-6 tracking-wide text-yellow-300">
            {mode === "single" ? "🤖 Single Player" : "🧍‍♂️🧍 Two Player"}
          </h2>

          {/* Board */}
          <div className="grid grid-cols-3 gap-3 mx-auto">
            {board.map((cell, i) => (
              <button
                key={i}
                onClick={() => handleClick(i)}
                className={`w-20 h-20 rounded-xl font-extrabold text-3xl flex items-center justify-center shadow-md transition-all duration-300 ${
                  cell === "X"
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : cell === "O"
                    ? "bg-pink-500 hover:bg-pink-600 text-white"
                    : "bg-white/20 hover:bg-white/30 text-white"
                }`}
              >
                {cell}
              </button>
            ))}
          </div>

          {/* Game Info */}
          <p className="mt-6 text-lg font-semibold">
            {winner
              ? winner === "Draw"
                ? "🤝 It's a Draw!"
                : `🏆 Winner: ${winner === "X" ? "Player X" : "Player O"}`
              : mode === "single"
              ? `Next: ${xIsNext ? "You (❌)" : "Computer (⭕)"}`
              : `Next Turn: ${xIsNext ? "Player X (❌)" : "Player O (⭕)"}`}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={resetGame}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105"
            >
              🔄 Reset
            </button>
            <button
              onClick={clearScore}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105"
            >
              🗑️ Clear Scores
            </button>
            <button
              onClick={backToMenu}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105"
            >
              ⬅️ Menu
            </button>
          </div>

          {/* Scoreboard */}
          <div className="mt-6 text-lg font-bold">
            <p>
              ❌ X: <span className="text-blue-300">{score.X}</span> | ⭕ O:{" "}
              <span className="text-pink-300">{score.O}</span>
            </p>
          </div>
        </div>
      )}
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
