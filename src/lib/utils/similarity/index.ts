type TagsData = {
    title:string,
    tags:string[]
}

export async function getMostSimilarTags(target:string, guess:string, tagData:TagsData[]) {
    let target_tags:string[] = [];
    let guess_tags:string[] = [];
    let most_similar:{[tag:string]:number} = {};

    //console.log('getMostSimilarTags', tagData.slice(345, 346))

    Promise.all(tagData.map((el) => {
        return new Promise((res, rej) => {
            //if (el.movie != target && el.movie != guess) rej();
            if (el.title == target || el.title == guess) {
                if (el.title == target) target_tags = el.tags;
                if (el.title == guess) guess_tags = el.tags;
                return Promise.all(el.tags.map((tag) => {
                    return new Promise((res, rej) => {
                        if (!(tag in most_similar)) res(most_similar[tag] = 1);
                        else res(most_similar[tag] += 1);
                    })
                }))
            }
        })
    }))

    /*for (let i = 0; i < tagData.length; i++) {
        if (tagData[i].movie == target) target_tags = tagData[i].tags;
        if (tagData[i].movie == guess) guess_tags = tagData[i].tags;
    }

    for (let i = 0; i < target_tags.length; i++) {
        if (!(target_tags[i] in most_similar)) most_similar[target_tags[i]] = 1;
        else most_similar[target_tags[i]] += 1;
    }

    for (let i = 0; i < guess_tags.length; i++) {
        if (!(guess_tags[i] in most_similar)) most_similar[guess_tags[i]] = 1;
        else most_similar[guess_tags[i]] += 1;
    }*/

    //let keys = Object.keys(most_similar);
    let keys = target_tags.filter(value => guess_tags.includes(value));
    keys.sort(function(a, b) {
        return most_similar[b] - most_similar[a];
    });

    //console.log('most_similar', keys.slice(0, 3));

    if (keys.length >= 3) return keys.slice(0, 2);
    else return keys;
}