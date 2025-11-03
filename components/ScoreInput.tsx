import { useState } from 'react';

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
  const [winner, setWinner] = useState<'player1' | 'player2' | null>(null);
  const [loserScore, setLoserScore] = useState<string>('');

  const handleWinnerSelect = (selectedWinner: 'player1' | 'player2') => {
    setWinner(selectedWinner);
    setLoserScore('');
    // Reset scores when changing winner
    onPlayer1ScoreChange(undefined as unknown as number);
    onPlayer2ScoreChange(undefined as unknown as number);
  };

  const handleLoserScoreChange = (score: string) => {
    setLoserScore(score);
    if (score === '') {
      onPlayer1ScoreChange(undefined as unknown as number);
      onPlayer2ScoreChange(undefined as unknown as number);
      return;
    }

    const scoreNum = Number.parseInt(score);
    if (scoreNum >= 0 && scoreNum <= 7) {
      if (winner === 'player1') {
        onPlayer1ScoreChange(14);
        onPlayer2ScoreChange(scoreNum);
      } else {
        onPlayer1ScoreChange(scoreNum);
        onPlayer2ScoreChange(14);
      }
    }
  };

  const isValidScore = player1Score === 14 && player2Score !== undefined && player2Score >= 0 && player2Score <= 7 ||
                       player2Score === 14 && player1Score !== undefined && player1Score >= 0 && player1Score <= 7;

  const handleNextRack = () => {
    onNextRack();
    // Reset local state for next rack input
    setWinner(null);
    setLoserScore('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 text-center">Rack {currentRack + 1}</h3>

      {/* Winner Selection */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3 text-center">Who won this rack?</p>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleWinnerSelect('player1')}
            className={`py-4 px-6 rounded-lg font-semibold transition ${
              winner === 'player1'
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
            }`}
          >
            {player1Name}
          </button>
          <button
            type="button"
            onClick={() => handleWinnerSelect('player2')}
            className={`py-4 px-6 rounded-lg font-semibold transition ${
              winner === 'player2'
                ? 'bg-red-600 text-white shadow-lg scale-105'
                : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
            }`}
          >
            {player2Name}
          </button>
        </div>
      </div>

      {/* Loser Score Input */}
      {winner && (
        <div className="mb-4">
          <label htmlFor="loser-score" className="block text-sm font-medium mb-2 text-center">
            {winner === 'player1' ? player2Name : player1Name}'s Score (0-7)
          </label>
          <input
            id="loser-score"
            type="number"
            min="0"
            max="7"
            value={loserScore}
            onChange={(e) => handleLoserScoreChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 text-center text-lg"
            placeholder="Enter score (0-7)"
          />
        </div>
      )}

      {/* Next Rack Button */}
      <button
        type="button"
        onClick={handleNextRack}
        disabled={!isValidScore}
        className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition shadow-lg"
      >
        Next Rack
      </button>
    </div>
  );
}
