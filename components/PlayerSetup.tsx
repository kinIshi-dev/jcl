import type { Player } from '@/types/game';

interface PlayerSetupProps {
  player1: Player;
  player2: Player;
  onPlayer1Change: (player: Player) => void;
  onPlayer2Change: (player: Player) => void;
  onStartGame: () => void;
}

export default function PlayerSetup({
  player1,
  player2,
  onPlayer1Change,
  onPlayer2Change,
  onStartGame,
}: PlayerSetupProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">JCL Scoreboard</h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="player1-name" className="block text-sm font-medium mb-2">
              Player 1 Name
            </label>
            <input
              id="player1-name"
              type="text"
              value={player1.name}
              onChange={(e) => onPlayer1Change({ ...player1, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label htmlFor="player1-fargo" className="block text-sm font-medium mb-2">
              Player 1 Fargogate
            </label>
            <input
              id="player1-fargo"
              type="number"
              value={player1.fargo}
              onChange={(e) => onPlayer1Change({ ...player1, fargo: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              placeholder="Enter Fargogate"
            />
          </div>

          <div>
            <label htmlFor="player2-name" className="block text-sm font-medium mb-2">
              Player 2 Name
            </label>
            <input
              id="player2-name"
              type="text"
              value={player2.name}
              onChange={(e) => onPlayer2Change({ ...player2, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label htmlFor="player2-fargo" className="block text-sm font-medium mb-2">
              Player 2 Fargogate
            </label>
            <input
              id="player2-fargo"
              type="number"
              value={player2.fargo}
              onChange={(e) => onPlayer2Change({ ...player2, fargo: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              placeholder="Enter Fargogate"
            />
          </div>

          <button
            type="button"
            onClick={onStartGame}
            disabled={!player1.name || !player2.name}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
