import { Schema, model, Document } from 'mongoose';

interface IProjectAttempt {
  attemptsLeft: number;
  status: 'locked' | 'in_progress' | 'completed';
  bestScore: number;
}

interface IUser extends Document {
  intraId: string;
  login: string;
  email: string;
  campus: string;
  xp: number;
  level: number;
  badges: string[];
  // Map<Key, Value> allows dynamic project names
  projectAttempts: Map<string, IProjectAttempt>; 
}

const UserSchema = new Schema<IUser>({
    intraId: { type: String, required: true, unique: true },
    login: { type: String, required: true },
    email: { type: String, required: true },
    campus: { type: String, required: true },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    badges: [String],
    projectAttempts: {
        type: Map,
        of: new Schema({
        attemptsLeft: { type: Number, default: 4 },
        status: { 
            type: String, 
            enum: ['locked', 'in_progress', 'completed'], 
            default: 'in_progress' 
        },
        bestScore: { type: Number, default: 0 }
        })
    }
})

export default model<IUser>('User', UserSchema);