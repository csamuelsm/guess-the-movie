//import fs from 'fs';
//import { Stream } from 'stream';

async function getWordAndVector(word_data:string[], size:number) {
  return new Promise((resolve, reject) => {
    if (!word_data) reject();
    //console.log('word_data', word_data);
    let length = word_data.length;
    //console.log('length', length);
    let vector_start = length - size;
    let vector = word_data.slice(vector_start).map((el:string) => Number(el));
    let word = word_data.slice(0, vector_start).join(' ');
    resolve({
      word: word,
      vector: vector
    });
  })
}

export async function getVectorsFromData(data:string, size:number) {
  let all_words = data.split(/[\n]/);
  //console.log(all_words);
  let result = await Promise.all(
    all_words.map((word_data) => getWordAndVector(word_data.split(' '), size))
  );
  /*for (let i = 0; i < all_words.length; i++) {
    let word_data = all_words[i].split(' ');
    let length = word_data.length;
    //console.log('length', length);
    let vector_start = length - size;
    let vector = word_data.slice(vector_start).map((el:string) => Number(el));
    let word = word_data.slice(0, vector_start).join(' ');
    result.push({
      word: word,
      vector: vector
    })
  }*/
  return result;
}

/*export default function streamW2VModel(path:string, size:number, maxTokenSize:number) {
  return new Promise(function(resolve, reject) {
    const outstream = new Stream.Readable({objectMode: true});
    const instream = fs.createReadStream(path, {
      highWaterMark: 64000*(maxTokenSize+size*12)
    });

    instream.on('error', reject);

    instream.on('end', () => outstream.emit('end'));

    const readNext = function() {
      const buffer = instream.read(maxTokenSize+size*12);
      if(!buffer) {
        //console.log('!buffer', buffer, instream.readableHighWaterMark, instream.readableLength, instream.bytesRead);
        outstream.push(null);
        return;
      }

      let arr = buffer.toString().split(/[\n]/);
      let data = arr[0].split(' ');
      //console.log(arr[0]);
      //console.log('len', arr[0].length);

      let length = data.length;
      //console.log('length', length);
      let vector_start = length - size;
      let vector = data.slice(vector_start).map((el:string) => Number(el));
      let word = data.slice(0, vector_start).join(' ');
      //console.log(word, vector);

      outstream.push({
        word: word,
        vector: vector
      })

      //console.log('unshift', arr.slice(1).join('\n'));
      instream.unshift(arr.slice(1).join('\n'));
    }

    instream.on('readable', function() {
      outstream._read = readNext;

      resolve(outstream);
    })

  });
}*/