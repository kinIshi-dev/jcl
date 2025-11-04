import type { Player } from '@/types/game';

interface GameResultProps {
  winner: Player;
  player1: Player;
  player2: Player;
  player1Score: number;
  player2Score: number;
  player1Goal: number;
  player2Goal: number;
  player1Scores: number[];
  player2Scores: number[];
  onPlayAgain: () => void;
  onClose: () => void;
}

export default function GameResult({
  winner,
  player1,
  player2,
  player1Score,
  player2Score,
  player1Goal,
  player2Goal,
  player1Scores,
  player2Scores,
  onPlayAgain,
  onClose,
}: GameResultProps) {
  // 勝者と敗者のスコアとゴールを判定
  const isPlayer1Winner = winner.name === player1.name;
  const loserScore = isPlayer1Winner ? player2Score : player1Score;
  const loserGoal = isPlayer1Winner ? player2Goal : player1Goal;

  // 最終スコア計算
  const loserDeficit = Math.max(0, loserGoal - loserScore); // 敗者の不足点数（0以上）
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
                <span className="text-2xl font-bold text-600">{player1FinalScore}</span>
              </div>
              <div className="text-xs text-gray-500 text-right">
                {isPlayer1Winner ? (
                  <div>
                    <div>100 (WB) + {loserDeficit} × 2 (MOV)</div>
                    <div>
                      合計: {player1Score} / {player1Goal}
                    </div>
                  </div>
                ) : (
                  <div>
                    合計: {player1Score} / {player1Goal}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{player2.name}</span>
                <span className="text-2xl font-bold text-600">{player2FinalScore}</span>
              </div>
              <div className="text-xs text-gray-500 text-right">
                {!isPlayer1Winner ? (
                  <div>
                    <div>100 (WB) + {loserDeficit} × 2 (MOV)</div>
                    <div>
                      合計: {player2Score} / {player2Goal}
                    </div>
                  </div>
                ) : (
                  <div>
                    合計: {player2Score} / {player2Goal}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-60 overflow-y-auto">
          <h3 className="font-semibold mb-3 text-center">ラック履歴</h3>
          <div className="space-y-2">
            {player1Scores.map((score, index) => {
              if (player2Scores[index] === undefined) return null;
              return (
                <div
                  key={`rack-${index}`}
                  className="flex justify-between items-center text-sm py-2 px-3 bg-white rounded"
                >
                  <span className="text-gray-600">#{index + 1}</span>
                  <div className="flex gap-4">
                    <span className={score === 14 ? 'font-bold text-blue-600' : 'text-gray-700'}>
                      {player1.name}: {score}
                    </span>
                    <span
                      className={
                        player2Scores[index] === 14 ? 'font-bold text-red-600' : 'text-gray-700'
                      }
                    >
                      {player2.name}: {player2Scores[index]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
          >
            戻る
          </button>
          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
          >
            もう一度プレイ
          </button>
        </div>
      </div>
    </div>
  );
}
