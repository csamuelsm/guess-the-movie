let regex = new RegExp(/A|An|The|And|Of|But|Or|For|Nor|With|On|At|To|From|By|Of|My|Our|Ours|Me|Myself|We|Ourselves|You|Your|Yours|Yourself|Yourselves|He|Him|His|Himself|She|Her|Hers|Herself|It|Its|Itself|They|Them|Their|Theirs|Themselves|What|Which|Who|Whom|This|That|These|Those|Am|Is|Are|Was|Were|Be|Been|Being|Have|Has|Had|Having|Do|Does|Did|Doing|A|An|The|And|But|If|Or|Because|As|Until|While|Of|At|By|With|About|Against|Between|Into|Through|During|After|Before|Above|Below|To|From|Up|Down|In|Out|On|Off|Over|Under|Again|Further|Then|Once|Here|There|When|Where|Why|How|All|Any|Both|Each|Few|More|Most|Other|Some|Such|No|Nor|Only|Own|Same|So|Than|Too|Very|Can|Will|Just|Should|Now/, 'g');
let reduced_regex = new RegExp(/A|An|The|And|Of|But|Or|For|Nor|With|On|At|To|From|By|Of|My|Our|Ours|Me|We|You|Your|Yours|He|Him|His|She|Her|Hers|It|Its|They|Them|What|Which|Who|Whom|This|That|Am|Is|Are|Was|Were|Be|Been|Have|Has|Had|Do|Does|Did|A|An|The|And|But|If|Or|As|Of|At|By|With|Into|To|From|Up|Down|In|Out|On|Off|Again|Then|Once|Here|There|When|Where|Why|How|All|Any|Each|Few|More|Some|Such|No|Nor|So|Than|Too|Can|Will/, 'g');

export function toTitleCase(word:string) {
    return word.toLowerCase().split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
}

export function normalizeString(word:string) {
    let title = toTitleCase(word);
    let modified = title.replaceAll(regex, function(match) {
        return match.toLowerCase();
    })
    return modified.charAt(0).toUpperCase() + modified.slice(1);
}

export function reducedNormalize(word:string) {
    let title = toTitleCase(word);
    let modified = title.replaceAll(reduced_regex, function(match) {
        return match.toLowerCase();
    })
    return modified.charAt(0).toUpperCase() + modified.slice(1);
}