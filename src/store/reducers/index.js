import {combineReducers} from "redux";

import {ADD_ON_OPEN, ADD_RESIDENCE, ADD_SESSION, OPEN_CONNECTION, REMOVE_ON_OPEN} from "../actions/actionTypes";
import {auth_cra, Connection} from "autobahn";
import {add_session} from "../actions";

function residence(state = {}, action) {
    if (action.type === ADD_RESIDENCE) {
        return action.residence;
    }
    return state;
}

function crossbar(state = {
    connection: null,
    session: null,
    on_open: []
}, action) {
    switch (action.type) {
        case ADD_ON_OPEN:
            return {
                on_open: [
                    ...state.on_open,
                    {
                        topic: action.topic,
                        callback: action.callback
                    }
                ],
                ...state
            };
        case REMOVE_ON_OPEN:
            return {
                on_open: state.on_open.filter(function (item) {
                    return item !== action.topic;
                }),
                ...state
            };
        case OPEN_CONNECTION:
            const ws_uri = {};
            if (document.location.hostname === "localhost") {
                ws_uri.transports = [
                    {
                        type: "websocket",
                        url: "ws://crossbar-pedro.herokuapp.com/ws"
                    }
                ];
            } else {
                ws_uri.url = (document.location.protocol === "http:" ? "ws:" : "wss:") + "//" + document.location.host + "/ws";
            }
            ws_uri["realm"] = "realm1";
            ws_uri["authmethods"] = ["wampcra"];
            ws_uri["authid"] = action.username;
            ws_uri["onchallenge"] = function (session, method, extra) {
                if (method === "wampcra") {
                    let key;
                    if ("salt" in extra) {
                        key = auth_cra.derive_key(action.password, extra.salt, extra.iterations, extra.keylength);
                    } else {
                        key = action.password;
                    }
                    return auth_cra.sign(key, extra.challenge);
                }
            };

            const connection = new Connection(ws_uri);
            connection.onopen = function (session) {
                console.info("Aberto");
                state.on_open.forEach(item => {
                    session.subscribe(item.topic, item.callback);
                });
                action.asyncDispatch(add_session(session));
            };
            connection.open();
            return {
                ...state,
                connection
            };
        case ADD_SESSION:
            return {
                ...state,
                session: action.session
            };
        default:
            return state;
    }
}

export default combineReducers({
    crossbar,
    residence
});
