export interface Player {
  name: string;
  fargo: string;
}

export interface GameState {
  player1: Player;
  player2: Player;
  player1Scores: number[];
  player2Scores: number[];
  currentRack: number;
}
