 import { Link } from "react-router-dom";

export default function Home() {
  const games = [
    {
      name: "Tic Tac Toe",
      route: "/tic-tac-toe",
      url: "/src/assets/tic-tac-toe.jpg",
      emoji: "❌⭕",
      desc: "Play the classic 3x3 grid battle!",
    },
    {
      name: "Hangman",
      route: "/hangman",
      url: "/src/assets/image5.jpg",
      emoji: "🪢",
      desc: "Guess the word before time runs out!",
    },
    {
      name: "Memory Match",
      route: "/memory-match",
      url: "/src/assets/image6.jpg",
      emoji: "🧠",
      desc: "Flip and match the pairs of icons!",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 p-8 text-white overflow-hidden">
      
      {/* Subtle animated background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#ffffff10,_transparent_50%)] animate-pulse"></div>

      {/* Header */}
      <header className="relative z-10 text-center mb-12">
        <h1 className="text-5xl font-extrabold drop-shadow-lg mb-2">
          🎮 Welcome to Game Hub
        </h1>
        <p className="text-lg text-gray-200">
          Play fun games & challenge yourself!
        </p>
      </header>

      {/* Game Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {games.map((game) => (
          <Link
            key={game.name}
            to={game.route}
            style={{
              backgroundImage: `url(${game.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="relative group rounded-2xl shadow-xl overflow-hidden w-64 h-64 transform hover:scale-105 transition-all duration-300"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm group-hover:bg-black/30 transition-all"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
              <div className="text-5xl mb-3">{game.emoji}</div>
              <h2 className="text-2xl font-bold mb-1">{game.name}</h2>
              <p className="text-sm text-gray-200">{game.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-12 text-gray-200 text-sm">
        © 2025 <span className="font-semibold text-white">GameHub</span> | Built by <span className="text-pink-300">Chandru.K</span>
      </footer>

      
    </div>
  );
}
