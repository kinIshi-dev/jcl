import type { Player } from '@/types/game';

interface PlayerScoreCardProps {
  player: Player;
  totalScore: number;
  goalScore?: number;
  isBreaking?: boolean;
}

export default function PlayerScoreCard({ player, totalScore, goalScore, isBreaking }: PlayerScoreCardProps) {
  const hasWon = goalScore && totalScore >= goalScore;

  // to hill と to win を計算
  const toHill = goalScore ? goalScore - 14 : 0;
  const toWin = goalScore ? goalScore - totalScore : 0;
  const isOnTheHill = goalScore && totalScore >= toHill && totalScore < goalScore;

  return (
    <div className={`rounded-lg shadow-lg p-6 transition-colors ${
      hasWon
        ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 border-4 border-yellow-500'
        : isOnTheHill
        ? 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 border-2 border-orange-400'
        : 'bg-white dark:bg-gray-800'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-xl font-bold">{player.name}</h2>
        <span className="text-2xl" title={isBreaking ? 'ブレイク中' : ''}>
          {isBreaking ? '🎱' : '\u00A0'}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Fargorate: {player.fargo || 'N/A'}
      </p>
      <div className="flex items-baseline gap-2">
        <p className={`text-4xl font-bold ${
          hasWon
            ? 'text-yellow-600 dark:text-yellow-400'
            : isOnTheHill
            ? 'text-orange-600 dark:text-orange-400'
            : 'text-blue-600'
        }`}>
          {totalScore}
        </p>
        {goalScore !== undefined && goalScore > 0 && (
          <p className="text-2xl text-gray-500 dark:text-gray-400">
            / {goalScore}
          </p>
        )}
      </div>

      {/* to hill / to win 表示 */}
      {goalScore !== undefined && goalScore > 0 && !hasWon && (
        <div className="mt-3 text-sm font-medium">
          {isOnTheHill ? (
            <p className="text-orange-600 dark:text-orange-400">
              🔥 On the hill! (to win: {toWin})
            </p>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              to hill: {Math.max(0, toHill - totalScore)}
            </p>
          )}
        </div>
      )}

      {hasWon && (
        <p className="mt-2 text-lg font-bold text-yellow-600 dark:text-yellow-400">
          🏆 勝利！
        </p>
      )}
    </div>
  );
}
