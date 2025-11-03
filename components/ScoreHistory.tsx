interface ScoreHistoryProps {
  player1Name: string;
  player2Name: string;
  player1Scores: number[];
  player2Scores: number[];
  currentRack: number;
}

export default function ScoreHistory({
  player1Name,
  player2Name,
  player1Scores,
  player2Scores,
  currentRack,
}: ScoreHistoryProps) {
  if (currentRack === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Score History</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Rack</th>
              <th className="py-2 px-4 text-center">{player1Name}</th>
              <th className="py-2 px-4 text-center">{player2Name}</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: currentRack }, (_, i) => (
              <tr key={`rack-${i + 1}`} className="border-b">
                <td className="py-2 px-4">{i + 1}</td>
                <td className="py-2 px-4 text-center">{player1Scores[i] ?? '-'}</td>
                <td className="py-2 px-4 text-center">{player2Scores[i] ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
