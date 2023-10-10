import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export const GET = async (req: Request) => {
    const file = '/sortedW2V.json';
    const fileDirectory = path.join(process.cwd(), 'public');

    const data = await fs.readFile(fileDirectory + file, 'utf8');
    const w2vdata = JSON.parse(data);
    if (data) {
        return NextResponse.json({ vectors: w2vdata }, { status: 200 });
    } else {
        return NextResponse.json({}, { status: 500 });
    }
};
