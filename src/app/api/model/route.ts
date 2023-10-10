import { NextResponse } from 'next/server';
import path from 'path';
//const w2v = require ('word2vec-loader-js');
//var word2vec = require('word2vec.js');
//const word2vecStream = require('word2vec-stream');
import streamW2VModel from '~/lib/utils';
import { Readable } from 'stream'

export const GET = async (req: Request) => {
    const file = '/user_genre_vectors.txt';
    const fileDirectory = path.join(process.cwd(), 'public');

    streamW2VModel(fileDirectory+file, 100, 200).then((vectorStream) => {
        console.log('streamW2VModel');
        let alreadyNull = false;
        if (vectorStream instanceof Readable) {
            const readInOne = () => {
                const nextWord = vectorStream.read();
                console.log(nextWord.word);
                if (nextWord===null) {
                    console.log('nextWord===null', alreadyNull);
                    if (alreadyNull) return;
                    else alreadyNull = true;
                } else {
                    alreadyNull = false;
                    readInOne();
                }
            }

            vectorStream.on('readable', () => {
                readInOne();
            })

            vectorStream.on('end', () => {
                console.log('finish');
            });
        }
    })

    //@ts-ignore
    /*word2vecStream(fileDirectory + file).then((vectorStream) => {
        let myRecords = [];

        const readInOne= () => {
            const nextWord= vectorStream.read();
            if (nextWord===null) return;

            //myRecords.push(nextWord);
            //console.log(nextWord);
            readInOne();
        }

        vectorStream.on('readable', () => {
            readInOne();
        });

        vectorStream.on('end', () => {
            console.log('finish');
        });
    })*/

    //'Toy Story (1995)'
    return NextResponse.json({ req: "working" }, { status: 200 });
};
