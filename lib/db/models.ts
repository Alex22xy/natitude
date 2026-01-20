import mongoose, { Schema, model, models } from 'mongoose';

// 1. USER SCHEMA (The Tribe Member)
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  avatar: String,
  bio: String,
  status: { type: String, enum: ['active', 'ghost'], default: 'active' },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

// 2. EVENT SCHEMA (The Jungle)
const EventSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  location: {
    name: String,
    coordinates: [Number], // [Longitude, Latitude] for Map features
  },
  startTime: Date,
  image: String,
  hypeCount: { type: Number, default: 0 }, // FOMO metric
  guestList: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

// Exporting models (Prevents re-defining models on hot-reload)
export const User = models.User || model('User', UserSchema);
export const Event = models.Event || model('Event', EventSchema);