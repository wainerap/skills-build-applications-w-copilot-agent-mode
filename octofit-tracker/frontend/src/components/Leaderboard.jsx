import { useEffect, useState } from 'react';
import { API_BASE_URL, parseApiResponse } from '../utils/api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setLeaderboard(parseApiResponse(data));
        setError(null);
      } catch (err) {
        setError(err.message);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <h1>Leaderboard</h1>
        <div className="alert alert-info">Loading leaderboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <h1>Leaderboard</h1>
        <div className="alert alert-danger">Error loading leaderboard: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>🏆 Leaderboard</h1>
      {leaderboard.length === 0 ? (
        <div className="alert alert-warning">No leaderboard entries found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
                <th>Activities</th>
                <th>Total Distance</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry._id || entry.id}>
                  <td>
                    <strong>#{index + 1}</strong>
                  </td>
                  <td>{entry.username || entry.user?.username || entry.name || 'Unknown'}</td>
                  <td>{entry.points || entry.score || 0}</td>
                  <td>{entry.activityCount || entry.activities || 0}</td>
                  <td>{entry.totalDistance ? `${entry.totalDistance} km` : '0 km'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
