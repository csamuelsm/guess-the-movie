import { Cookie } from "next/font/google";

let Cookies = require('js-cookie');

export function getCookie(cookieName:string) {
    return Cookies.get(cookieName);
}

export function getNumberOfGames() {
    if (cookieExist('number_of_games'))
        return getCookie('number_of_games');
    else return 0;
}

export function getLastPlayed() {
    return getCookie('last_played');
}

export function getNumberOfVictories() {
    if (cookieExist('victories'))
        return getCookie('victories');
    else return 0;
}

export function getStreak() {
    if (cookieExist('streak'))
        return getCookie('streak');
    else return 0;
}

export function getGamesPlayed() {
    if (cookieExist('games_played')) return getCookie('games_played');
    else return [];
}

export function cookieExist(cookieName:string) {
    let res = getCookie(cookieName);
    if (res) return true;
    else return false;
}

export function increaseNumberOfGames() {
    if (cookieExist('number_of_games')) {
        let curr = getNumberOfGames();
        Cookies.set('number_of_games', parseInt(curr) + 1, { expires: 365 });
    } else {
        Cookies.set('number_of_games', 1, { expires: 365 });
    }
}

export function increaseNumberOfVictories() {
    if (cookieExist('victories')) {
        let curr = getNumberOfVictories();
        Cookies.set('victories', parseInt(curr) + 1, { expires: 365 });
    } else {
        Cookies.set('victories', 1, { expires: 365 });
    }
}

export function setLastPlayed(date:Date) {
    if (date) Cookies.set('last_played', date, { expires: 365 });
}

export function getVictoriesPercentage() {
    let number_of_games = parseFloat(getNumberOfGames());
    let victories = parseFloat(getNumberOfVictories());
    let perc = (100 * (victories/number_of_games)).toFixed(1);
    return perc;
}

export function lastPlayedToday() {
    let today = new Date();
    let last_played = new Date(getLastPlayed());
    if (today && last_played) {
        return today.toDateString() == last_played.toDateString()
    } else return false;
}

export function lastPlayedYesterday() {
    let last_played = new Date(getLastPlayed());
    let today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (yesterday && last_played) {
        return yesterday.toDateString() == last_played.toDateString();
    } else {
        return false;
    }
}

export function increaseStreak() {
    if (cookieExist('streak') && lastPlayedYesterday()) {
        let curr = parseInt(getStreak());
        Cookies.set('streak', curr + 1, { expires: 365 });
    } else {
        Cookies.set('streak', 1, { expires: 365 });
    }
}

export function resetStreak() {
    Cookies.set('streak', 0, { expires: 365 });
}

export function alreadyPlayedThisGame(gameNumber:number) {
    if (cookieExist('games_played')) {
        let games_played = JSON.parse(getCookie('games_played'));
        //console.log('game_played', JSON.parse(getCookie('games_played')));
        if (games_played.includes(gameNumber) || games_played.includes(gameNumber.toString())) return true;
        else return false;
    } else return false;
}

export function addGamePlayed(gameNumber:number) {
    if (cookieExist('games_played')) {
        let games_played = JSON.parse(getCookie('games_played'));
        //console.log('addGamePlayed', games_played);
        if (games_played.includes(gameNumber)) return;
        else {
            games_played.push(gameNumber.toString());
            Cookies.set('games_played', JSON.stringify(games_played), { expires: 365 });
        }
        //console.log(getCookie('games_played'));
    } else {
        Cookies.set('games_played', JSON.stringify([gameNumber.toString()]), { expires: 365 });
    }
}