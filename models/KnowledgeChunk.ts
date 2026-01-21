import mongoose, { Schema, Document } from 'mongoose';

export interface IKnowledgeChunk extends Document {
  projectId: mongoose.Types.ObjectId;
  content: string;
  embedding: number[];
}

const KnowledgeChunkSchema: Schema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  content: { type: String, required: true },
  embedding: { type: [Number], required: true },
});

export default mongoose.models.KnowledgeChunk || mongoose.model<IKnowledgeChunk>('KnowledgeChunk', KnowledgeChunkSchema);