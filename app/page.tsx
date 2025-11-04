'use client';

import GameResult from '@/components/GameResult';
import PlayerScoreCard from '@/components/PlayerScoreCard';
import PlayerSetup from '@/components/PlayerSetup';
import ScoreHistory from '@/components/ScoreHistory';
import ScoreInput from '@/components/ScoreInput';
import type { Player } from '@/types/game';
import { calculateRace } from '@/utils/calculate';
import { useState } from 'react';

export default function Home() {
  const [player1, setPlayer1] = useState<Player>({ name: '', fargo: '' });
  const [player2, setPlayer2] = useState<Player>({ name: '', fargo: '' });
  const [player1Scores, setPlayer1Scores] = useState<number[]>([]);
  const [player2Scores, setPlayer2Scores] = useState<number[]>([]);
  const [currentRack, setCurrentRack] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [editingRack, setEditingRack] = useState<number | null>(null);
  const [player1Goal, setPlayer1Goal] = useState<number>(0);
  const [player2Goal, setPlayer2Goal] = useState<number>(0);
  const [showGameResult, setShowGameResult] = useState(false);

  const startGame = () => {
    if (player1.name && player2.name) {
      // FargoRateからゴール点数を計算（長いレース: 1.0）
      const raceResult = calculateRace(1.0, player1.fargo, player2.fargo);
      setPlayer1Goal(raceResult.raceToOne);
      setPlayer2Goal(raceResult.raceToTwo);

      setGameStarted(true);
      setPlayer1Scores([]);
      setPlayer2Scores([]);
      setCurrentRack(0);
    }
  };

  const addPlayer1Score = (score: number) => {
    if (score < 0 || score > 14) return;
    const newScores = [...player1Scores];
    newScores[currentRack] = score;
    setPlayer1Scores(newScores);
  };

  const addPlayer2Score = (score: number) => {
    if (score < 0 || score > 14) return;
    const newScores = [...player2Scores];
    newScores[currentRack] = score;
    setPlayer2Scores(newScores);
  };

  const nextRack = () => {
    if (player1Scores[currentRack] !== undefined && player2Scores[currentRack] !== undefined) {
      if (editingRack !== null) {
        // Exit edit mode and return to the latest rack
        setEditingRack(null);
        setCurrentRack(player1Scores.length);
      } else {
        // Move to next rack
        setCurrentRack(currentRack + 1);

        // 次のラックに進んだ後、試合が終了していればモーダルを表示
        const newPlayer1Total = getTotal([...player1Scores].slice(0, currentRack + 1));
        const newPlayer2Total = getTotal([...player2Scores].slice(0, currentRack + 1));
        if (newPlayer1Total >= player1Goal || newPlayer2Total >= player2Goal) {
          setShowGameResult(true);
        }
      }
    }
  };

  const handleEditRack = (rackIndex: number) => {
    setEditingRack(rackIndex);
    setCurrentRack(rackIndex);
  };

  const handleCancelEdit = () => {
    setEditingRack(null);
    // Return to the latest rack
    setCurrentRack(player1Scores.length);
  };

  const getTotal = (scores: number[]) => {
    return scores.reduce((sum, score) => sum + (score || 0), 0);
  };

  // 勝者を取得
  const getWinner = (): Player | null => {
    const player1Total = getTotal(player1Scores);
    const player2Total = getTotal(player2Scores);

    // 両者がゴールに達した場合、最後のラックで14点を取った方が勝者
    if (player1Total >= player1Goal && player2Total >= player2Goal) {
      const lastRackIndex = Math.min(player1Scores.length, player2Scores.length) - 1;
      if (lastRackIndex >= 0) {
        const lastPlayer1Score = player1Scores[lastRackIndex];
        const lastPlayer2Score = player2Scores[lastRackIndex];
        if (lastPlayer1Score === 14) return player1;
        if (lastPlayer2Score === 14) return player2;
      }
    }

    if (player1Total >= player1Goal) return player1;
    if (player2Total >= player2Goal) return player2;
    return null;
  };

  // ゲームをリセット
  const resetGame = () => {
    setGameStarted(false);
    setPlayer1Scores([]);
    setPlayer2Scores([]);
    setCurrentRack(0);
    setEditingRack(null);
    setPlayer1Goal(0);
    setPlayer2Goal(0);
    setShowGameResult(false);
  };

  // 試合結果モーダルを閉じて最終ラックを削除
  const closeGameResult = () => {
    setShowGameResult(false);
    // 最終ラックのスコアを配列から削除して再入力できるようにする
    const lastRackIndex = getCompletedRacksCount() - 1;
    if (lastRackIndex >= 0) {
      const newPlayer1Scores = player1Scores.slice(0, lastRackIndex);
      const newPlayer2Scores = player2Scores.slice(0, lastRackIndex);
      setPlayer1Scores(newPlayer1Scores);
      setPlayer2Scores(newPlayer2Scores);
      setCurrentRack(lastRackIndex);
    }
  };

  // 完成したラックの数を計算（両プレイヤーのスコアが入力済み）
  const getCompletedRacksCount = () => {
    let count = 0;
    for (let i = 0; i < Math.max(player1Scores.length, player2Scores.length); i++) {
      if (player1Scores[i] !== undefined && player2Scores[i] !== undefined) {
        count++;
      }
    }
    return count;
  };

  if (!gameStarted) {
    return (
      <PlayerSetup
        player1={player1}
        player2={player2}
        onPlayer1Change={setPlayer1}
        onPlayer2Change={setPlayer2}
        onStartGame={startGame}
      />
    );
  }

  const winner = getWinner();
  const player1Total = getTotal(player1Scores);
  const player2Total = getTotal(player2Scores);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">JCL Scoreboard</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <PlayerScoreCard player={player1} totalScore={player1Total} goalScore={player1Goal} />
          <PlayerScoreCard player={player2} totalScore={player2Total} goalScore={player2Goal} />
        </div>

        <ScoreInput
          player1Name={player1.name}
          player2Name={player2.name}
          currentRack={currentRack}
          player1Score={player1Scores[currentRack]}
          player2Score={player2Scores[currentRack]}
          onPlayer1ScoreChange={addPlayer1Score}
          onPlayer2ScoreChange={addPlayer2Score}
          onNextRack={nextRack}
          isEditMode={editingRack !== null}
          onCancelEdit={handleCancelEdit}
        />

        <ScoreHistory
          player1Name={player1.name}
          player2Name={player2.name}
          player1Scores={player1Scores}
          player2Scores={player2Scores}
          currentRack={getCompletedRacksCount()}
          onEditRack={handleEditRack}
        />

        {showGameResult && winner && (
          <GameResult
            winner={winner}
            player1={player1}
            player2={player2}
            player1Score={player1Total}
            player2Score={player2Total}
            player1Goal={player1Goal}
            player2Goal={player2Goal}
            player1Scores={player1Scores}
            player2Scores={player2Scores}
            onPlayAgain={resetGame}
            onClose={closeGameResult}
          />
        )}
      </div>
    </div>
  );
}
