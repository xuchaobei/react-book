import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./modules";

let finalCreateStore;
if (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__ ) {
  finalCreateStore = compose(
    applyMiddleware(thunk),
    // Required! Enable Redux DevTools with the monitors you chose
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )(createStore);
} else {
  finalCreateStore = applyMiddleware(thunk)(createStore);
}

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./modules", () =>
      store.replaceReducer(require("./modules"))
    );
  }

  return store;
}
