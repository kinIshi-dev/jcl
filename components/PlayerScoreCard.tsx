import type { Player } from '@/types/game';

interface PlayerScoreCardProps {
  player: Player;
  totalScore: number;
  goalScore?: number;
}

export default function PlayerScoreCard({ player, totalScore, goalScore }: PlayerScoreCardProps) {
  const hasWon = goalScore && totalScore >= goalScore;

  return (
    <div className={`rounded-lg shadow-lg p-6 transition-colors ${
      hasWon
        ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 border-4 border-yellow-500'
        : 'bg-white dark:bg-gray-800'
    }`}>
      <h2 className="text-xl font-bold mb-2">{player.name}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Fargorate: {player.fargo || 'N/A'}
      </p>
      <div className="flex items-baseline gap-2">
        <p className={`text-4xl font-bold ${hasWon ? 'text-yellow-600 dark:text-yellow-400' : 'text-blue-600'}`}>
          {totalScore}
        </p>
        {goalScore !== undefined && goalScore > 0 && (
          <p className="text-2xl text-gray-500 dark:text-gray-400">
            / {goalScore}
          </p>
        )}
      </div>
      {hasWon && (
        <p className="mt-2 text-lg font-bold text-yellow-600 dark:text-yellow-400">
          🏆 勝利！
        </p>
      )}
    </div>
  );
}
