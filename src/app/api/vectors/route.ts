import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export const GET = async (req: Request) => {
    const file = '/user_genre_vectors.txt';
    const fileDirectory = path.join(process.cwd(), 'public');

    const data = await fs.readFile(fileDirectory + file);
    if (data) {
        return NextResponse.json({ vectors: data.toString() }, { status: 200 });
    } else {
        return NextResponse.json({}, { status: 500 });
    }
};
