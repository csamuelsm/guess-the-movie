import { NextResponse } from 'next/server';
import { parse } from 'csv';
import path from 'path';
import fs from 'fs';

type Payload = {
    value: string
}

export const POST = async (req: Request) => {
    const data:Payload = await req.json();
    try {
        const { value } = data;
        const re = new RegExp(`${value.toLowerCase()}.*`, "g");

        const file = '/movies.csv';
        const fileDirectory = path.join(process.cwd(), 'public');
        const records = [];
        const parser = fs.createReadStream(fileDirectory + '/movies.csv')
                        .pipe(parse());
        for await (const record of parser) {
            if (re.test(record[1].toLowerCase()) && record[1] !== 'title') records.push(record);
        }
        return NextResponse.json({ req: records }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 200 });
    }
};
