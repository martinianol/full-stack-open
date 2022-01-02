import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers/anecdoteReducer";
import { createStore } from "redux";

export const store = createStore(reducer, composeWithDevTools())

