import { NextResponse } from 'next/server';
import path from 'path';
import {promises as fs} from 'fs';
import { parse } from 'csv-parse/sync';

export const GET = async (req: Request) => {
    try {
        const file = '/movies.csv';
        const fileDirectory = path.join(process.cwd(), 'public');
        const fileContent = await fs.readFile(fileDirectory + file, 'utf8');
        return NextResponse.json({ req: fileContent }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 200 });
    }
};
