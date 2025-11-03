import type { Player } from '@/types/game';

interface PlayerScoreCardProps {
  player: Player;
  totalScore: number;
}

export default function PlayerScoreCard({ player, totalScore }: PlayerScoreCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-2">{player.name}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Fargogate: {player.fargo || 'N/A'}
      </p>
      <p className="text-4xl font-bold text-blue-600">{totalScore}</p>
    </div>
  );
}
