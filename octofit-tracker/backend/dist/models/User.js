import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    displayName: { type: String, trim: true },
}, { timestamps: true });
export default model('User', userSchema);
