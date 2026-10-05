import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'maya-rivera',
        email: 'maya.rivera@example.com',
        displayName: 'Maya Rivera',
      },
      {
        username: 'jamal-price',
        email: 'jamal.price@example.com',
        displayName: 'Jamal Price',
      },
      {
        username: 'nora-kim',
        email: 'nora.kim@example.com',
        displayName: 'Nora Kim',
      },
      {
        username: 'eli-turner',
        email: 'eli.turner@example.com',
        displayName: 'Eli Turner',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Cardio Crew',
        description: 'A team focused on running, cycling, and weekly endurance goals.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Strength Squad',
        description: 'Lifters and functional fitness fans building consistent strength habits.',
        members: [users[2]._id, users[3]._id],
      },
    ]);

    const activities = await Activity.insertMany([
      {
        user: users[0]._id,
        activityType: 'Outdoor Run',
        durationMinutes: 42,
        caloriesBurned: 410,
        completedAt: new Date('2026-10-01T12:30:00Z'),
      },
      {
        user: users[1]._id,
        activityType: 'Spin Class',
        durationMinutes: 50,
        caloriesBurned: 525,
        completedAt: new Date('2026-10-02T18:00:00Z'),
      },
      {
        user: users[2]._id,
        activityType: 'Strength Training',
        durationMinutes: 60,
        caloriesBurned: 460,
        completedAt: new Date('2026-10-03T15:15:00Z'),
      },
      {
        user: users[3]._id,
        activityType: 'Yoga Flow',
        durationMinutes: 35,
        caloriesBurned: 180,
        completedAt: new Date('2026-10-04T09:00:00Z'),
      },
    ]);

    const leaderboard = await Leaderboard.insertMany([
      {
        user: users[1]._id,
        username: users[1].username,
        score: 925,
        rank: 1,
      },
      {
        user: users[0]._id,
        username: users[0].username,
        score: 880,
        rank: 2,
      },
      {
        user: users[2]._id,
        username: users[2].username,
        score: 835,
        rank: 3,
      },
      {
        user: users[3]._id,
        username: users[3].username,
        score: 790,
        rank: 4,
      },
    ]);

    const workouts = await Workout.insertMany([
      {
        name: 'Morning Mobility Reset',
        description: 'A low-impact warmup routine for flexibility and joint range of motion.',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Cat-cow stretch', 'World greatest stretch', 'Bodyweight squats', 'Glute bridges'],
      },
      {
        name: 'Tempo Strength Builder',
        description: 'A balanced strength session using controlled tempo and compound movements.',
        difficulty: 'intermediate',
        durationMinutes: 45,
        exercises: ['Goblet squats', 'Dumbbell rows', 'Push-ups', 'Romanian deadlifts'],
      },
      {
        name: 'Endurance Interval Challenge',
        description: 'A high-intensity conditioning workout for experienced athletes.',
        difficulty: 'advanced',
        durationMinutes: 55,
        exercises: ['Treadmill intervals', 'Kettlebell swings', 'Burpees', 'Plank holds'],
      },
    ]);

    console.log(`Inserted ${users.length} users`);
    console.log(`Inserted ${teams.length} teams`);
    console.log(`Inserted ${activities.length} activities`);
    console.log(`Inserted ${leaderboard.length} leaderboard entries`);
    console.log(`Inserted ${workouts.length} workouts`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
