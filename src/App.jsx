 import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TicTacToe from "./components/TicTacToe";
import Hangman from "./components/Hangman";
import MemoryMatch from "./components/MemoryMatch";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{
          backgroundImage: `url("/src/assets/wp28362.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/hangman" element={<Hangman />} />
          <Route path="/memory-match" element={<MemoryMatch />} />
        </Routes>
      </div>
    </div>
  );
}
