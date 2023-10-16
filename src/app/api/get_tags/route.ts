import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { getMostSimilarTags } from '~/lib/utils/similarity';

type Payload = {
    value: string
}

export const GET = async (req: Request) => {
    //const data:Payload = await req.json();
    try {
        //const { value } = data;

        const file = '/tags.json';
        const fileDirectory = path.join(process.cwd(), 'public');

        const fileContent = await fs.readFile(fileDirectory + file);
        const tagList = await JSON.parse(fileContent.toString());

        let top3 = await getMostSimilarTags('Waiting to Exhale (1995)', 'Toy Story 2 (1999)', tagList);

        return NextResponse.json({ req: top3 }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 200 });
    }
};

export const POST = async (req: Request) => {
    const data = await req.json();
    //console.log(data);
    try {
        const target = data['target'];
        const guess = data['guess'];
        //console.log(target, guess);

        const file = '/tags.json';
        const fileDirectory = path.join(process.cwd(), 'public');

        const fileContent = await fs.readFile(fileDirectory + file);
        const tagList = await JSON.parse(fileContent.toString());

        let top3 = await getMostSimilarTags(target, guess, tagList);

        return NextResponse.json({ req: top3 }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 200 });
    }
};
