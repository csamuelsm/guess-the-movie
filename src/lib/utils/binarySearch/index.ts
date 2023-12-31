type wordObjectType = {
    word: string,
    vector: number[],
}

export default function binarySearch(wordsObject:wordObjectType[], word:string) {
    let start = 0;
    let end = wordsObject.length - 1;
    return binSearchUtil(wordsObject, word, start, end);
}

function binSearchUtil(wordsObject:wordObjectType[], word:string, start:number, end:number) {
    if (start > end) return -1;

    let mid = Math.floor((start + end)/2);

    if (wordsObject[mid].word === word.trim()) return wordsObject[mid];

    if (wordsObject[mid].word > word.trim())
        return binSearchUtil(wordsObject, word, start, mid-1);
    else
        return binSearchUtil(wordsObject, word, mid+1, end);
}