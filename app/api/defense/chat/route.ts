import { NextRequest, NextResponse } from 'next/server';
import { getEmbedding, chatModel } from '@/lib/gemini';
import KnowledgeChunk from '@/models/KnowledgeChunk';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    const { message, projectId } = await request.json();

    if (!message || !projectId) {
      return NextResponse.json({ error: 'Missing message or projectId' }, { status: 400 });
    }

    const queryEmbedding = await getEmbedding(message);

    const pipeline = [
      {
        $vectorSearch: {
          index: 'default',
          path: 'embedding',
          queryVector: queryEmbedding,
          numCandidates: 10,
          limit: 5,
          filter: { projectId: new mongoose.Types.ObjectId(projectId) },
        },
      },
      {
        $project: {
          content: 1,
          score: { $meta: 'vectorSearchScore' },
        },
      },
    ];

    const results = await KnowledgeChunk.aggregate(pipeline);

    const context = results.map((doc: any) => doc.content).join('\n');

    const prompt = `Based on the following context, answer the question:\n\n${context}\n\nQuestion: ${message}`;

    const result = await chatModel.generateContent(prompt);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in defense chat:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}