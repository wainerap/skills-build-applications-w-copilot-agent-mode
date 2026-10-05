import { useEffect, useState } from 'react';
import { API_BASE_URL, parseApiResponse } from '../utils/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/activities/`);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setActivities(parseApiResponse(data));
        setError(null);
      } catch (err) {
        setError(err.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <h1>Activities</h1>
        <div className="alert alert-info">Loading activities...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <h1>Activities</h1>
        <div className="alert alert-danger">Error loading activities: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>Activities</h1>
      {activities.length === 0 ? (
        <div className="alert alert-warning">No activities found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Distance</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td>{activity._id || activity.id}</td>
                  <td>{activity.type || 'N/A'}</td>
                  <td>{activity.distance ? `${activity.distance} km` : 'N/A'}</td>
                  <td>{activity.duration ? `${activity.duration} min` : 'N/A'}</td>
                  <td>{activity.calories ? `${activity.calories} kcal` : 'N/A'}</td>
                  <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
