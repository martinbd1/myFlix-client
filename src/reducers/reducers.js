// src/reducers/reducers.js

import {
    combineReducers
} from "redux";

import {
    SET_FILTER,
    SET_MOVIES,
    SET_USER,
    SET_FAV,
    ADD_FAV,
    REM_FAV,
    SET_DIRECT,
    SET_GENRE,

} from "../actions/actions";

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            console.log('SET_FILTER reducer reached');
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            console.log('SET_MOVIES reducer reached');
            return action.value;
        default:
            return state;
    }
}

function user(state = '', action) {
    switch (action.type) {
        case SET_USER:
            console.log('SET_USER reducer reached');
            return action.value;
        default:
            return state;
    }
}

function favorites(state = [], action) {
    switch (action.type) {
        case SET_FAV:
            console.log('SET_FAV reducer reached');
            return action.value;
        case ADD_FAV:
            console.log('ADD_FAV reducer reached');
            return action.value;
        case REM_FAV:
            console.log('REM_FAV reducer reached');
            return action.value;
        default:
            return state;
    }
}

function directors(state = [], action) {
    switch (action.type) {
        case SET_DIRECT:
            console.log('SET_DIRECT reducer reached');
            return action.value;
        default:
            return state;
    }
}

function genres(state = [], action) {
    switch (action.type) {
        case SET_GENRE:
            console.log('SET_GENRE reducer reached');
            return action.value;
        default:
            return state;
    }
}

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user,
    favorites,
    directors,
    genres
});

export default moviesApp;