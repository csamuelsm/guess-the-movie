import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { getMostSimilarTags } from '~/lib/utils/similarity';
import { getHints } from '~/lib/utils/similarity';

type Payload = {
    value: string
}

export const GET = async (req: Request) => {
    let sims = await getHints("Prenda-me se for Capaz (2002)");
    return NextResponse.json({ req: sims }, { status: 200 });
}

export const POST = async (req: Request) => {
    const data = await req.json();
    //console.log(data);
    try {
        const target = data['target'];
        //console.log(target, guess);

        let sims = await getHints(target);

        return NextResponse.json({ req: sims }, { status: 200 });
    } catch (err) {
        console.log('Erro', err);
        return NextResponse.json({ message: err }, { status: 200 });
    }
};
