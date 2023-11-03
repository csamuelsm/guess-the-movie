type TagsData = {
    title:string,
    tags:string[]
}

const forbidden_words:string[] = ['',
'boring', 'pg', 'a', 'aa', 'aba', 'ababa', 'abcd', 'dvi', 'bd', 'bdvideo', 'dv', 'dvd', 'dvd collection',
'dvd1',
'dvdalternate endings',
'dvdr',
'dvdram',
'dvdvideo',
'seen',
'seen 2006',
'seen 2007',
'seen 2008',
'seen 2009',
'seen 2010',
'seen 2011',
'seen 2012',
'seen 2013',
'seen 2014',
'seen 2015',
'seen 2016',
'seen 2017',
'seen 2018',
'seen 2019',
'seen a while ago',
'seen at the cinema',
'seen it before',
'seen more than once',
'seen on airplane',
'seen part of',
'ridiculous dialogue',
'stupid',
'silly',
'sucks',
'ridiculous',
'underdog',
'dumb science',
'dumb',
'dumb screenplay',
'obnoxious',
'sexy redhead',
'dumb but funny',
'ugly', 'idiots', 'bullshit history', 'dumb humor',
'stupid stereotypes', 'stupid as hell', 'stupid ending',
'garbage', 'crap', 'uwe boll sucks', 'dumb blonde', 'ridiculous end',
'fucked up', 'idiotic', 'bullshit science', 'gross', 'dumb plot',
'flabby ass', 'womanizer', 'stupidity', 'transvestite', 'garbage dump',
'white trash', 'idiot', 'dumbhumor', 'stupid but funny', 'harley quinns ass',
'ridiculous characters', 'stupid characters', 'stupid plot', 'silly plot',
'grossout', 'trash', 'trash movie', 'dumb ending', 'ridiculous training sequence',
'absolute crap', 'high brow stupidity', 'stupid main character', 'silly ending',
'stupid story', 'violently stupid', 'wtf', 'stupid twist', 'disgusting', 'ridiculous',
'white trash', 'moronic', 'stupid comedy', 'shit', 'two hours of suck',
'watched it for the boobs', 'crap ending', 'ugly woman', 'idiot plot',
'wtf ending', 'motherfucker', 'rubber nipples', 'pathetic', 'ending sucked',
'stupid heroes', 'bullshit', 'stupid fight scenes', 'crappy', 'ridiculous ending',
'very dumb', 'full of stupid things', 'idiotic characters', 'extremely stupid humor',
'sluts', 'damn dirty apes', 'pointless', 'stupid people', 'ridiculous monsters',
'pretentious garbage about good things', 'wtf', 'dumb fun', 'protagonist is an idiot',
'batshit crazy', 'stupid children ruin everything', 'useless', 'transvestites',
'underaged sexchild porn', 'evangelical christian trash',
'pretentious', 'previsible', 'bad acting', 'overestimated', 'overvalue', 'predictable', 'foreseeable',
'cocky', 'poor plot', 'overrated', 'bad writing', 'poor dialogue', 'racial victimism',
'good acting', 'great acting', 'atmospheric', 'acting', 'dvix', 'ending', 'have',
'having', 'want', 'wish', 'wating'];

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
    let keys = target_tags.filter(value => guess_tags.includes(value) && !forbidden_words.includes(value));
    let keys_unique = keys.filter((value, index, array) => array.indexOf(value) === index);
    keys_unique.sort(function(a, b) {
        return most_similar[b] - most_similar[a];
    });

    //console.log('most_similar', keys.slice(0, 3));

    if (keys_unique.length >= 2) return keys_unique.slice(0, 2);
    else return keys_unique;
}