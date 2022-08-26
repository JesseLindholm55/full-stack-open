import React from "react";
import ReactDOM from "react-dom/client";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import reducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";
import anecdoteService from "./services/anecdotes";

//const combineReducer = combineReducers

const rootReducer = combineReducers({
  notification: notificationReducer,
  anecdote: reducer,
  filter: filterReducer,
});

const store = createStore(rootReducer);

anecdoteService
  .getAll()
  .then((anecdotes) =>
    store.dispatch({ type: "SET_ANECDOTES", payload: anecdotes })
  );

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
