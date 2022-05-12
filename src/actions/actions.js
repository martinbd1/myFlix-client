// src/actions/actions.js

export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_FAV = 'SET_FAV';
export const ADD_FAV = 'ADD_FAV';
export const REM_FAV = 'REM_FAV';
export const SET_DIRECT = 'SET_DIRECT';
export const SET_GENRE = 'SET_GENRE';

export function setMovies(value) {
    console.log('SET_MOVIES action triggered');
    return {
        type: SET_MOVIES,
        value
    }
}

export function setFilter(value) {
    return {
        type: SET_FILTER,
        value
    }
}

export function setUser(value) {
    console.log('SET_USER action triggered');
    return {
        type: SET_USER,
        value
    }
}

export function setFav(value) {
    console.log('SET_FAV action triggered');
    return {
        type: SET_FAV,
        value
    }
}

export function addFav(value) {
    console.log('ADD_FAV action triggered');
    return {
        type: ADD_FAV,
        value
    }
}

export function remFav(value) {
    console.log('REM_FAV action triggered');
    return {
        type: REM_FAV,
        value
    }
}

export function setDirect(value) {
    console.log('SET_DIRECT action triggered');
    return {
        type: SET_DIRECT,
        value
    }
}

export function setGenre(value) {
    console.log('SET_GENRE action triggered');
    return {
        type: SET_GENRE,
        value
    }
}