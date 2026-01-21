import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const projects = [];

    // Read python0.json, python1.json, python2.json
    for (let i = 0; i <= 2; i++) {
      const filePath = path.join(dataDir, `python${i}.json`);
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const project = JSON.parse(fileContent);
        projects.push(project);
      }
    }

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error reading project files:', error);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}