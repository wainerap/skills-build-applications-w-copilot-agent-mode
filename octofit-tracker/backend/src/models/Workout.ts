import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, min: 0 },
    exercises: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export default model('Workout', workoutSchema);