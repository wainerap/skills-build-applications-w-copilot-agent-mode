import { useEffect, useState } from 'react';
import { API_BASE_URL, parseApiResponse } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/workouts/`);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setWorkouts(parseApiResponse(data));
        setError(null);
      } catch (err) {
        setError(err.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <h1>Workouts</h1>
        <div className="alert alert-info">Loading workouts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <h1>Workouts</h1>
        <div className="alert alert-danger">Error loading workouts: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>💪 Workouts</h1>
      {workouts.length === 0 ? (
        <div className="alert alert-warning">No workouts found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Exercises</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.id}>
                  <td>{workout.name || 'N/A'}</td>
                  <td>{workout.type || 'N/A'}</td>
                  <td>{workout.difficulty || 'N/A'}</td>
                  <td>{workout.duration ? `${workout.duration} min` : 'N/A'}</td>
                  <td>{workout.exerciseCount || workout.exercises?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
