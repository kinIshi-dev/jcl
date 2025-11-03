'use client';

import PlayerScoreCard from '@/components/PlayerScoreCard';
import PlayerSetup from '@/components/PlayerSetup';
import ScoreHistory from '@/components/ScoreHistory';
import ScoreInput from '@/components/ScoreInput';
import type { Player } from '@/types/game';
import { useState } from 'react';

export default function Home() {
  const [player1, setPlayer1] = useState<Player>({ name: '', fargo: '' });
  const [player2, setPlayer2] = useState<Player>({ name: '', fargo: '' });
  const [player1Scores, setPlayer1Scores] = useState<number[]>([]);
  const [player2Scores, setPlayer2Scores] = useState<number[]>([]);
  const [currentRack, setCurrentRack] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    if (player1.name && player2.name) {
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
      setCurrentRack(currentRack + 1);
    }
  };

  const getTotal = (scores: number[]) => {
    return scores.reduce((sum, score) => sum + (score || 0), 0);
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

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">JCL Scoreboard</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <PlayerScoreCard player={player1} totalScore={getTotal(player1Scores)} />
          <PlayerScoreCard player={player2} totalScore={getTotal(player2Scores)} />
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
        />

        <ScoreHistory
          player1Name={player1.name}
          player2Name={player2.name}
          player1Scores={player1Scores}
          player2Scores={player2Scores}
          currentRack={currentRack}
        />
      </div>
    </div>
  );
}
