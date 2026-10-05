import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, min: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model('Activity', activitySchema);