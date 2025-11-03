interface ScoreHistoryProps {
  player1Name: string;
  player2Name: string;
  player1Scores: number[];
  player2Scores: number[];
  currentRack: number;
  onEditRack: (rackIndex: number) => void;
}

export default function ScoreHistory({
  player1Name,
  player2Name,
  player1Scores,
  player2Scores,
  currentRack,
  onEditRack,
}: ScoreHistoryProps) {
  if (currentRack === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Score History</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Tap a row to edit</p>
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
              <tr
                key={`rack-${i + 1}`}
                onClick={() => onEditRack(i)}
                className="border-b hover:bg-blue-50 dark:hover:bg-blue-900/20 active:bg-blue-100 dark:active:bg-blue-900/40 cursor-pointer transition-colors"
              >
                <td className="py-3 px-4">#{i + 1}</td>
                <td className="py-3 px-4 text-center font-medium">{player1Scores[i] ?? '-'}</td>
                <td className="py-3 px-4 text-center font-medium">{player2Scores[i] ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
