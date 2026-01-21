import mongoose from 'mongoose';
import { getEmbedding } from '../lib/gemini';
import KnowledgeChunk from '../models/KnowledgeChunk';

const MONGODB_URI = process.env.MONGODB_URI!;

const chunks = [
  {
    title: "Intro",
    text: "Welcome to Data Quest: The Pixel Dimension! You're building 'PixelMetrics 3000'. Level 0: Command Quest (sys.argv). Level 1: Score Cruncher (Lists). Level 2: Position Tracker (Tuples). Level 3: Achievement Hunter (Sets). Level 4: Inventory Master (Dictionaries). Level 5: Stream Wizard (Generators). Level 6: Data Alchemist (Comprehensions)."
  },
  {
    title: "Ex0: Command Quest",
    text: "Directory: ex0/. File: ft_command_quest.py. Authorized: sys, sys.argv, len, print. Task: Discover how programs receive messages via command line. Example: python3 ft_command_quest.py hello -> Arguments received: 2"
  },
  {
    title: "Ex1: Score Cruncher",
    text: "Directory: ex1/. File: ft_score_analytics.py. Authorized: sys.argv, len, sum, max, min, int, print, try/except. Task: Score analysis using Lists. Calculate total, average, high/low. Handle invalid inputs gracefully."
  },
  {
    title: "Ex2: Position Tracker",
    text: "Directory: ex2/. File: ft_coordinate_system.py. Authorized: sys.argv, math, tuple, int, float, print, split, math.sqrt. Task: 3D coordinate system using Tuples (immutable). Calculate Euclidean distance between (x,y,z) points."
  },
  {
    title: "Ex3: Achievement Hunter",
    text: "Directory: ex3/. File: ft_achievement_tracker.py. Authorized: set, len, print, union, intersection, difference. Task: Achievement system using Sets. Find unique achievements, common ones (intersection), and missing ones (difference)."
  },
  {
    title: "Ex4: Inventory Master",
    text: "Directory: ex4/. File: ft_inventory_system.py. Authorized: dict, len, keys, values, items, get, update. Task: Inventory system using Dictionaries. Key-value pairs for instant lookups by item name."
  },
  {
    title: "Ex5: Stream Wizard",
    text: "Directory: ex5/. File: ft_data_stream.py. Authorized: yield, next, iter, range. Task: Process data streams using Generators. Use 'yield' to process events one by one to save memory."
  },
  {
    title: "Ex6: Data Alchemist",
    text: "Directory: ex6/. File: ft_analytics_dashboard.py. Authorized: List/dict/set comprehensions. Task: Analytics dashboard. Focus on demonstrating mastery of comprehensions (one-line transformations) for lists, sets, and dicts."
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Assuming a dummy projectId for Module 3
    const projectId = new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'); // Replace with actual projectId

    for (const chunk of chunks) {
      console.log(`Processing: ${chunk.title}`);
      const embedding = await getEmbedding(chunk.text);

      const knowledgeChunk = new KnowledgeChunk({
        projectId,
        content: chunk.text,
        embedding,
      });

      await knowledgeChunk.save();
      console.log(`Saved: ${chunk.title}`);
    }

    console.log('Seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();