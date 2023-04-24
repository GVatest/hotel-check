import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {
  authReducer,
  loginWatcher,
  logoutWatcher,
  hotelsReducer,
  searchHotelsWatcher,
} from "features";
import { all } from "redux-saga/effects";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hotels: hotelsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat([saga]),
});

function* rootSaga() {
  yield all([loginWatcher(), logoutWatcher(), searchHotelsWatcher()]);
}

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
