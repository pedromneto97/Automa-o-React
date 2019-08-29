import {
  ADD_ON_OPEN,
  ADD_RESIDENCE,
  ADD_SESSION,
  OPEN_CONNECTION,
  REMOVE_ON_OPEN
} from "./actionTypes";
import { Session } from "autobahn";

export function add_to_on_open(topic: string, callback) {
  return {
    type: ADD_ON_OPEN,
    topic,
    callback
  };
}

export function remove_to_on_open(topic: string) {
  return {
    type: REMOVE_ON_OPEN,
    topic
  };
}

export function add_residence(residence: Object) {
  return {
    type: ADD_RESIDENCE,
    residence
  };
}

export function add_session(session: Session) {
  return {
    type: ADD_SESSION,
    session
  };
}

export function open_connection(username, password) {
  return {
    type: OPEN_CONNECTION,
    username,
    password
  };
}
