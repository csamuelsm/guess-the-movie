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

export function cookieExist(cookieName:string) {
    let res = getCookie(cookieName);
    if (res) return true;
    else return false;
}

export function increaseNumberOfGames() {
    if (cookieExist('number_of_games')) {
        let curr = getNumberOfGames();
        Cookies.set('number_of_games', parseInt(curr) + 1);
    } else {
        Cookies.set('number_of_games', 1);
    }
}

export function increaseNumberOfVictories() {
    if (cookieExist('victories')) {
        let curr = getNumberOfVictories();
        Cookies.set('victories', parseInt(curr) + 1);
    } else {
        Cookies.set('victories', 1);
    }
}

export function setLastPlayed(date:Date) {
    if (date) Cookies.set('last_played', date);
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
        Cookies.set('streak', curr + 1);
    } else {
        Cookies.set('streak', 1);
    }
}

export function resetStreak() {
    Cookies.set('streak', 0);
}