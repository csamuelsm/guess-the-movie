import { NextResponse } from 'next/server';
import path from 'path';
import {promises as fs} from 'fs';
import { startDate } from '~/lib/utils/const';

export const GET = async (req: Request) => {
    try {
        const file = '/games.csv';
        const fileDirectory = path.join(process.cwd(), 'public');
        const fileContent = await fs.readFile(fileDirectory + file, 'utf8');
        const movies = fileContent.split(/\r\n|\n/);
        //console.log(movies);
        const today = new Date();
        let diffMs = today.getTime() - startDate.getTime();
        let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        //console.log(diffDays)
        return NextResponse.json({ games: movies.splice(0, diffDays), number: diffDays }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
};
