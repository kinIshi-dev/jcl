import type { Player } from '@/types/game';

interface GameResultProps {
  winner: Player;
  player1: Player;
  player2: Player;
  player1Score: number;
  player2Score: number;
  player1Goal: number;
  player2Goal: number;
  onPlayAgain: () => void;
}

export default function GameResult({
  winner,
  player1,
  player2,
  player1Score,
  player2Score,
  player1Goal,
  player2Goal,
  onPlayAgain,
}: GameResultProps) {
  // 勝者と敗者のスコアとゴールを判定
  const isPlayer1Winner = winner.name === player1.name;
  const winnerScore = isPlayer1Winner ? player1Score : player2Score;
  const loserScore = isPlayer1Winner ? player2Score : player1Score;
  const loserGoal = isPlayer1Winner ? player2Goal : player1Goal;

  // 最終スコア計算
  const loserDeficit = loserGoal - loserScore; // 敗者の不足点数
  const winnerFinalScore = 100 + loserDeficit * 2; // 勝者: 100(wb) + 不足点数*2(mov)
  const loserFinalScore = loserScore; // 敗者: 稼いだ得点

  const player1FinalScore = isPlayer1Winner ? winnerFinalScore : loserFinalScore;
  const player2FinalScore = isPlayer1Winner ? loserFinalScore : winnerFinalScore;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">試合終了</h2>
          <p className="text-xl text-gray-600">Winner</p>
        </div>

        <div className="text-center mb-8">
          <p className="text-4xl font-bold text-blue-600 mb-2">{winner.name}</p>
          {winner.fargo && <p className="text-sm text-gray-500">Fargo: {winner.fargo}</p>}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3 text-center">最終スコア</h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{player1.name}</span>
                <span className="text-2xl font-bold text-blue-600">
                  {player1FinalScore}
                </span>
              </div>
              <div className="text-xs text-gray-500 text-right">
                {isPlayer1Winner ? (
                  <div>
                    <div>100 (WB) + {loserDeficit} × 2 (MOV)</div>
                    <div>ラック: {player1Score} / {player1Goal}</div>
                  </div>
                ) : (
                  <div>ラック: {player1Score} / {player1Goal}</div>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{player2.name}</span>
                <span className="text-2xl font-bold text-blue-600">
                  {player2FinalScore}
                </span>
              </div>
              <div className="text-xs text-gray-500 text-right">
                {!isPlayer1Winner ? (
                  <div>
                    <div>100 (WB) + {loserDeficit} × 2 (MOV)</div>
                    <div>ラック: {player2Score} / {player2Goal}</div>
                  </div>
                ) : (
                  <div>ラック: {player2Score} / {player2Goal}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          もう一度プレイ
        </button>
      </div>
    </div>
  );
}
