import {combineReducers} from "redux";

import {ADD_ON_OPEN, ADD_RESIDENCE, ADD_SESSION, REMOVE_ON_OPEN} from "../actions/actionTypes";

function on_open(state = [], action) {
    switch (action.type) {
        case ADD_ON_OPEN:
            return [
                ...state,
                {
                    topic: action.topic,
                    callback: action.callback
                }
            ];
        case REMOVE_ON_OPEN:
            return state.filter(function (item) {
                return item !== action.topic;
            });
        default:
            return state;
    }
}

function residence(state = {}, action) {
    if (action.type === ADD_RESIDENCE) {
        return action.residence;
    }
    return state;
}

function session(state = null, action) {
    if (action.type === ADD_SESSION) {
        return action.session;
    }
    return state;
}

export default combineReducers({
    crossbar: on_open,
    session,
    residence
});
