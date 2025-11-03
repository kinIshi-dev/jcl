import { useState, useEffect } from 'react';

interface ScoreInputProps {
  player1Name: string;
  player2Name: string;
  currentRack: number;
  player1Score: number | undefined;
  player2Score: number | undefined;
  onPlayer1ScoreChange: (score: number) => void;
  onPlayer2ScoreChange: (score: number) => void;
  onNextRack: () => void;
  isEditMode?: boolean;
  onCancelEdit?: () => void;
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
  isEditMode = false,
  onCancelEdit,
}: ScoreInputProps) {
  // Initialize winner and loserScore based on existing scores in edit mode
  const getInitialWinner = (): 'player1' | 'player2' | null => {
    if (player1Score === 14) return 'player1';
    if (player2Score === 14) return 'player2';
    return null;
  };

  const getInitialLoserScore = (): string => {
    if (player1Score === 14 && player2Score !== undefined) return player2Score.toString();
    if (player2Score === 14 && player1Score !== undefined) return player1Score.toString();
    return '';
  };

  const [winner, setWinner] = useState<'player1' | 'player2' | null>(getInitialWinner());
  const [loserScore, setLoserScore] = useState<string>(getInitialLoserScore());

  // スコアが変わったときにローカルステートを再初期化
  useEffect(() => {
    const newWinner = player1Score === 14 ? 'player1' : player2Score === 14 ? 'player2' : null;
    const newLoserScore =
      player1Score === 14 && player2Score !== undefined ? player2Score.toString() :
      player2Score === 14 && player1Score !== undefined ? player1Score.toString() : '';

    setWinner(newWinner);
    setLoserScore(newLoserScore);
  }, [player1Score, player2Score]);

  const handleWinnerSelect = (selectedWinner: 'player1' | 'player2') => {
    setWinner(selectedWinner);
    setLoserScore('');
    // 編集モードでない場合のみスコアをクリア
    // 編集モードでは既存のスコアを保持
    if (!isEditMode) {
      onPlayer1ScoreChange(undefined as unknown as number);
      onPlayer2ScoreChange(undefined as unknown as number);
    }
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

  const isValidScore =
    (player1Score === 14 && player2Score !== undefined && player2Score >= 0 && player2Score <= 7) ||
    (player2Score === 14 && player1Score !== undefined && player1Score >= 0 && player1Score <= 7);

  const handleNextRack = () => {
    onNextRack();
    // Reset local state for next rack input
    setWinner(null);
    setLoserScore('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-center flex-1">
          {isEditMode ? `Edit Rack #${currentRack + 1}` : `Rack #${currentRack + 1}`}
        </h3>
        {isEditMode && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            キャンセル
          </button>
        )}
      </div>

      {/* Winner Selection */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3 text-center">勝った方を選択</p>
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
            {winner === 'player1' ? player2Name : player1Name} のスコア (0-7)
          </label>
          <input
            id="loser-score"
            type="number"
            min="0"
            max="7"
            value={loserScore}
            onChange={(e) => handleLoserScoreChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 text-center text-lg"
            placeholder="スコアを入力 (0-7)"
          />
        </div>
      )}

      {/* Next Rack / Save Button */}
      <button
        type="button"
        onClick={handleNextRack}
        disabled={!isValidScore}
        className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition shadow-lg"
      >
        {isEditMode ? '変更を保存' : '次のラックへ'}
      </button>
    </div>
  );
}
