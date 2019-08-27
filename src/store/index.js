import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import {asyncDispatchMiddleware} from "./middlewares";

export default createStore(reducers, applyMiddleware(asyncDispatchMiddleware));
