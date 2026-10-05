import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'OctoFit Tracker API is running' });
});
app.get('/api/users/', async (req, res, next) => {
    try {
        const users = await User.find().sort({ username: 1 });
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/teams/', async (req, res, next) => {
    try {
        const teams = await Team.find().populate('members').sort({ name: 1 });
        res.json(teams);
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/activities/', async (req, res, next) => {
    try {
        const activities = await Activity.find().populate('user').sort({ completedAt: -1 });
        res.json(activities);
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/leaderboard/', async (req, res, next) => {
    try {
        const leaderboard = await Leaderboard.find().sort({ rank: 1, score: -1 });
        res.json(leaderboard);
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/workouts/', async (req, res, next) => {
    try {
        const workouts = await Workout.find().sort({ difficulty: 1, name: 1 });
        res.json(workouts);
    }
    catch (error) {
        next(error);
    }
});
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
});
async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`✓ Server running on port ${PORT}`);
            console.log(`✓ API available at ${baseUrl}/api`);
        });
    }
    catch (error) {
        console.error('✗ Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
export default app;
