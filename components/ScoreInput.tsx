interface ScoreInputProps {
  player1Name: string;
  player2Name: string;
  currentRack: number;
  player1Score: number | undefined;
  player2Score: number | undefined;
  onPlayer1ScoreChange: (score: number) => void;
  onPlayer2ScoreChange: (score: number) => void;
  onNextRack: () => void;
}

export default function ScoreInput({
  player1Name,
  player2Name,
  currentRack,
  player1Score,
  player2Score,
  onPlayer1ScoreChange,
  onPlayer2ScoreChange,
  onNextRack,
}: ScoreInputProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Rack {currentRack + 1}</h3>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="player1-score" className="block text-sm font-medium mb-2">
            {player1Name} Score (0-14)
          </label>
          <input
            id="player1-score"
            type="number"
            min="0"
            max="14"
            value={player1Score ?? ''}
            onChange={(e) => onPlayer1ScoreChange(Number.parseInt(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            placeholder="0-14"
          />
        </div>

        <div>
          <label htmlFor="player2-score" className="block text-sm font-medium mb-2">
            {player2Name} Score (0-14)
          </label>
          <input
            id="player2-score"
            type="number"
            min="0"
            max="14"
            value={player2Score ?? ''}
            onChange={(e) => onPlayer2ScoreChange(Number.parseInt(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            placeholder="0-14"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onNextRack}
        disabled={player1Score === undefined || player2Score === undefined}
        className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        Next Rack
      </button>
    </div>
  );
}
