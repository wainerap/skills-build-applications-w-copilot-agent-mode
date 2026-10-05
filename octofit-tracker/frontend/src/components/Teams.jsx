import { useEffect, useState } from 'react';
import { fetchFromApi } from '../utils/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('/teams/');
        setTeams(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <h1>Teams</h1>
        <div className="alert alert-info">Loading teams...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <h1>Teams</h1>
        <div className="alert alert-danger">Error loading teams: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>👥 Teams</h1>
      {teams.length === 0 ? (
        <div className="alert alert-warning">No teams found</div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id || team.id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name || 'Unnamed Team'}</h5>
                  <p className="card-text">{team.description || 'No description'}</p>
                  <div className="small text-muted">
                    <p className="mb-1">
                      <strong>Members:</strong> {team.memberCount || team.members?.length || 0}
                    </p>
                    <p className="mb-0">
                      <strong>Leader:</strong> {team.leader || team.createdBy || 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
