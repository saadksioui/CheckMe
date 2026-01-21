import { Schema, model, Document } from 'mongoose';

interface IProject extends Document {
    slug: string;
    title: string;
    description: string;
    difficulty: number;
    testSuiteCode: string;
    questions: Array<{
        q: string;
        answers: string[];
    }>;
}

const ProjectSchema = new Schema<IProject>({
    slug: { type: String, required: true, unique: true },          
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: Number, required: true },
    testSuiteCode: { type: String, required: true },
    questions: [
        {
            q: { type: String, required: true },
            answers: { type: [String], required: true }
        }
    ]
})

export default model<IProject>('Project', ProjectSchema);