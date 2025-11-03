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
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">JCL Scoreboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Player 1 Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg shadow-lg p-6 border-4 border-blue-500">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                P1
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-700 dark:text-blue-200">
              Player 1
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="player1-name" className="block text-sm font-medium mb-2">
                  名前
                </label>
                <input
                  id="player1-name"
                  type="text"
                  value={player1.name}
                  onChange={(e) => onPlayer1Change({ ...player1, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700"
                  placeholder="名前を入力"
                />
              </div>

              <div>
                <label htmlFor="player1-fargo" className="block text-sm font-medium mb-2">
                  Fargorate
                </label>
                <input
                  id="player1-fargo"
                  type="number"
                  value={player1.fargo}
                  onChange={(e) => onPlayer1Change({ ...player1, fargo: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700"
                  placeholder="Fargorateを入力"
                />
              </div>
            </div>
          </div>

          {/* Player 2 Card */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 rounded-lg shadow-lg p-6 border-4 border-red-500">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                P2
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-6 text-red-700 dark:text-red-200">
              Player 2
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="player2-name" className="block text-sm font-medium mb-2">
                  名前
                </label>
                <input
                  id="player2-name"
                  type="text"
                  value={player2.name}
                  onChange={(e) => onPlayer2Change({ ...player2, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700"
                  placeholder="名前を入力"
                />
              </div>

              <div>
                <label htmlFor="player2-fargo" className="block text-sm font-medium mb-2">
                  Fargorate
                </label>
                <input
                  id="player2-fargo"
                  type="number"
                  value={player2.fargo}
                  onChange={(e) => onPlayer2Change({ ...player2, fargo: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700"
                  placeholder="Fargorateを入力"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onStartGame}
          disabled={!player1.name || !player2.name}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-lg text-lg font-bold hover:from-blue-700 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition shadow-lg"
        >
          ゲーム開始
        </button>
      </div>
    </div>
  );
}
