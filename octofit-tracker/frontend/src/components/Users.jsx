import { useEffect, useState } from 'react';
import { fetchFromApi } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('/users/');
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <h1>Users</h1>
        <div className="alert alert-info">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <h1>Users</h1>
        <div className="alert alert-danger">Error loading users: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>👤 Users</h1>
      {users.length === 0 ? (
        <div className="alert alert-warning">No users found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Level</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id}>
                  <td>{user.username || 'N/A'}</td>
                  <td>{user.email || 'N/A'}</td>
                  <td>{user.level || 1}</td>
                  <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
