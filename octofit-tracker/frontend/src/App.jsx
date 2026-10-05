import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function Home() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h1 className="display-4">Welcome to Octofit Tracker</h1>
          <p className="lead">
            Track your fitness activities, join teams, and climb the leaderboard!
          </p>
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">📊 Activities</h5>
                  <p className="card-text">Log and track your fitness activities</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">💪 Workouts</h5>
                  <p className="card-text">Personalized workout suggestions</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">🏆 Leaderboard</h5>
                  <p className="card-text">Compete with other users</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">👥 Teams</h5>
                  <p className="card-text">Create and manage teams</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </>
  );
}

export default App
