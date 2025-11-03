/**
 * FargoRate計算ユーティリティ
 * ビリヤードのレーティングシステムに基づいたレース計算
 */

// 定数定義
const CONSTANTS = {
  // スコア関連
  MAX_RACK_SCORE: 14.0,
  BASE_LOSER_SCORE: 7.4,
  RATING_COEFFICIENT: 0.0062,

  // レーティング計算
  GP_MULTIPLIER: 0.018,
  GP_OFFSET: 1.4,
  WIN_PROBABILITY_DIVISOR: 100,
  LOGISTIC_BASE: 2,

  // クランプ値
  HIGH_CLAMP: 99.0,
  LOW_CLAMP_LONG: 28.0,
  LOW_CLAMP_SHORT: 24.0,

  // ダンプファクター
  DAMP_LONG_RACE: 1.0,
  DAMP_SHORT_RACE: 0.75,

  // トーナメント計算
  TOURNAMENT_MULTIPLIER: 3,
} as const;

export type RaceResult = {
  raceToOne: number;
  raceToTwo: number;
};

export type TeamRatingsRow = {
  teamOneRating?: number | string;
  teamTwoRating?: number | string;
};

/**
 * 0.5を偶数側に丸める（銀行家の丸め）
 *
 * @param value - 丸める値
 * @param increment - 丸めの単位（デフォルト: 1）
 * @returns 丸められた値
 *
 * @example
 * roundHalfToEven(2.5) // 2
 * roundHalfToEven(3.5) // 4
 */
export function roundHalfToEven(value: number, increment = 1): number {
  const scaled = value / increment;
  const whole = Math.trunc(scaled);
  const frac = Math.abs(scaled - whole);

  // 0.5でない場合は通常の四捨五入
  if (frac !== 0.5) {
    return Math.round(scaled) * increment;
  }

  // ちょうど0.5の場合は偶数へ
  const isWholeOdd = Math.abs(whole) % 2 === 1;
  const rounded = isWholeOdd ? whole + (scaled > whole ? 1 : -1) : whole;
  return rounded * increment;
}

/**
 * 2人のプレイヤーのFargoRateからレース条件を計算
 *
 * @param dampFactor - ダンプファクター（1.0: 長いレース, 0.75: 短いレース）
 * @param ratingOne - プレイヤー1のFargoRate
 * @param ratingTwo - プレイヤー2のFargoRate
 * @returns 各プレイヤーのレース到達点数
 *
 * @example
 * calculateRace(1.0, 650, 600) // { raceToOne: 75, raceToTwo: 68 }
 */
export function calculateRace(
  dampFactor: 1.0 | 0.75,
  ratingOne: number | string,
  ratingTwo: number | string,
): RaceResult {
  const p1Rating = Number(ratingOne) || 0;
  const p2Rating = Number(ratingTwo) || 0;

  // 平均レートから係数（gp）を算出
  const avgRating = (p1Rating + p2Rating) / 2;
  const gp = CONSTANTS.GP_MULTIPLIER * avgRating - CONSTANTS.GP_OFFSET;

  // レート差から勝率を計算（ロジスティック関数）
  const delta = p1Rating - p2Rating;
  const p1WinPercent =
    1 - 1 / (1 + CONSTANTS.LOGISTIC_BASE ** (delta / CONSTANTS.WIN_PROBABILITY_DIVISOR));
  const p2WinPercent = 1 - p1WinPercent;

  // 平均得点を計算（14点満点 + 相手依存の式）
  const p1AvgPts =
    p1WinPercent * CONSTANTS.MAX_RACK_SCORE +
    p2WinPercent * (CONSTANTS.BASE_LOSER_SCORE - CONSTANTS.RATING_COEFFICIENT * p2Rating);
  const p2AvgPts =
    p2WinPercent * CONSTANTS.MAX_RACK_SCORE +
    p1WinPercent * (CONSTANTS.BASE_LOSER_SCORE - CONSTANTS.RATING_COEFFICIENT * p1Rating);

  // Race-toを計算
  let p1RaceTo = p1AvgPts * gp * dampFactor;
  let p2RaceTo = p2AvgPts * gp * dampFactor;

  // 正規化とクランプ処理
  ({ p1RaceTo, p2RaceTo } = normalizeRace(
    p1RaceTo,
    p2RaceTo,
    dampFactor === CONSTANTS.DAMP_SHORT_RACE,
  ));

  // 0.5は偶数へ丸める
  return {
    raceToOne: roundHalfToEven(p1RaceTo, 1),
    raceToTwo: roundHalfToEven(p2RaceTo, 1),
  };
}

/**
 * トーナメント用のハンデ計算
 * 複数の対戦ペアのレーティング差を合計してハンデを算出
 *
 * @param rows - チームレーティングの配列
 * @returns 各チームのハンデ点数
 *
 * @example
 * calculateTournamentRace([
 *   { teamOneRating: 650, teamTwoRating: 600 },
 *   { teamOneRating: 620, teamTwoRating: 580 }
 * ])
 * // { teamOneHandicap: 0, teamTwoHandicap: 15 }
 */
export function calculateTournamentRace(rows: TeamRatingsRow[]) {
  let teamOneHandicap = 0;
  let teamTwoHandicap = 0;

  for (const row of rows) {
    const t1 = Number(row.teamOneRating) || 0;
    const t2 = Number(row.teamTwoRating) || 0;

    const delta = t1 - t2;
    const p1Win = 1 - 1 / (1 + CONSTANTS.LOGISTIC_BASE ** (delta / CONSTANTS.WIN_PROBABILITY_DIVISOR));
    const p2Win = 1 - p1Win;

    const p1AvgPts =
      (p1Win * CONSTANTS.MAX_RACK_SCORE +
        p2Win * (CONSTANTS.BASE_LOSER_SCORE - CONSTANTS.RATING_COEFFICIENT * t2)) *
      CONSTANTS.TOURNAMENT_MULTIPLIER;
    const p2AvgPts =
      (p2Win * CONSTANTS.MAX_RACK_SCORE +
        p1Win * (CONSTANTS.BASE_LOSER_SCORE - CONSTANTS.RATING_COEFFICIENT * t1)) *
      CONSTANTS.TOURNAMENT_MULTIPLIER;

    teamOneHandicap += p1AvgPts;
    teamTwoHandicap += p2AvgPts;
  }

  // 差分を計算して、優位なチームのハンデは0、劣位なチームにハンデを付与
  if (teamOneHandicap > teamTwoHandicap) {
    return {
      teamOneHandicap: 0,
      teamTwoHandicap: Math.floor(teamOneHandicap - teamTwoHandicap),
    };
  }
  if (teamTwoHandicap > teamOneHandicap) {
    return {
      teamOneHandicap: Math.floor(teamTwoHandicap - teamOneHandicap),
      teamTwoHandicap: 0,
    };
  }
  return { teamOneHandicap: 0, teamTwoHandicap: 0 };
}

/**
 * Race-to値の正規化とクランプ処理
 * 上限・下限を適用し、バランスを調整
 *
 * @param p1RaceTo - プレイヤー1のRace-to値
 * @param p2RaceTo - プレイヤー2のRace-to値
 * @param isShort - 短いレースかどうか
 * @returns 正規化されたRace-to値
 */
export function normalizeRace(p1RaceTo: number, p2RaceTo: number, isShort: boolean) {
  const highClamp = CONSTANTS.HIGH_CLAMP;
  const lowClamp = isShort ? CONSTANTS.LOW_CLAMP_SHORT : CONSTANTS.LOW_CLAMP_LONG;

  const p1IsHigh = p1RaceTo >= p2RaceTo;
  const highRace = Math.max(p1RaceTo, p2RaceTo);
  const lowRace = Math.min(p1RaceTo, p2RaceTo);

  // 上限クランプ処理
  let highRaceClamped = Math.min(highRace, highClamp);
  let lowRaceClamped =
    highRace > highClamp ? lowRace - lowRace * ((highRace - highClamp) / highRace) : lowRace;

  // 下限クランプ処理（高い方も調整）
  if (lowRace < lowClamp) {
    highRaceClamped = Math.min(
      highRaceClamped + highRaceClamped * ((lowClamp - lowRace) / lowRaceClamped),
      highClamp,
    );
  }

  lowRaceClamped = Math.max(lowRaceClamped, lowClamp);

  return {
    p1RaceTo: p1IsHigh ? highRaceClamped : lowRaceClamped,
    p2RaceTo: p1IsHigh ? lowRaceClamped : highRaceClamped,
  };
}
