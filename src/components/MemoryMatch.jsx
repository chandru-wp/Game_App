 import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const icons = ["🍎", "🍌", "🍇", "🍓", "🍒", "🥝"];

export default function MemoryMatch() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(() => JSON.parse(localStorage.getItem("memoryScore")) || 0);

  useEffect(() => {
    localStorage.setItem("memoryScore", JSON.stringify(score));
  }, [score]);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const shuffled = [...icons, ...icons].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
  };

  const handleFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index])) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setTimeout(() => {
        const [i1, i2] = newFlipped;
        if (cards[i1] === cards[i2]) {
          setMatched([...matched, cards[i1]]);
          setScore(score + 1);
        }
        setFlipped([]);
      }, 700);
    }
  };

  const clearScore = () => {
    localStorage.removeItem("memoryScore");
    setScore(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 drop-shadow-sm">
        🧠 Memory Match
      </h2>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg">
        {cards.map((c, i) => (
          <div
            key={i}
            onClick={() => handleFlip(i)}
            className={`w-16 h-16 sm:w-20 sm:h-20 flex justify-center items-center text-3xl rounded-2xl cursor-pointer transition-all duration-300 shadow-md ${
              flipped.includes(i) || matched.includes(c)
                ? "bg-gradient-to-br from-pink-300 to-purple-300 text-white scale-105"
                : "bg-white hover:bg-purple-100 text-gray-700"
            }`}
          >
            {flipped.includes(i) || matched.includes(c) ? c : "❓"}
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={startGame}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow-md transition-all"
        >
          🔄 Restart
        </button>
        <button
          onClick={clearScore}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition-all"
        >
          🧹 Clear Score
        </button>
      </div>

      <p className="mt-4 text-lg font-medium text-purple-700">
        🏆 Score: <span className="font-bold">{score}</span>
      </p>
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
