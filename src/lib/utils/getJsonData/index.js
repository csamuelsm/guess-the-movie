import { promises as fs } from 'fs';
import path from 'path';

export async function getLocalData() {
    const filePath = path.join(process.cwd(), '../data/index.json');
    const jsonData = await fs.readFile(filePath);
    const objectData = JSON.parse(jsonData);
    return objectData;
}