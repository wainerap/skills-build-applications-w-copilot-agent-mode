import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    username: { type: String, required: true, trim: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

export default model('Leaderboard', leaderboardSchema, 'leaderboard');