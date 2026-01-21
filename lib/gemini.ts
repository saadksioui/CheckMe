import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export const getEmbedding = async (text: string): Promise<number[]> => {
  const model = genAI.getGenerativeModel({ model: 'embedding-001' });
  const result = await model.embedContent(text);
  return result.embedding.values;
};

export const chatModel = genAI.getGenerativeModel({ model: 'gemini-pro' });