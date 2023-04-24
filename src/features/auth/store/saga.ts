import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../api";
import { login, logout } from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { Credentials } from "../types";
import { IUser } from "../models";

function* loginWorker(action: PayloadAction<Credentials>) {
  const { request, success, failure, fulfill } = login;
  yield request();
  try {
    const user: IUser = yield call(api.login, action.payload);
    yield put(success(user));
  } catch (e) {
    yield put(failure(e));
  } finally {
    yield put(fulfill());
  }
}

function* logoutWorker() {
  const { request, success, failure, fulfill } = logout;
  yield request();
  try {
    yield call(api.logout);
    yield put(success());
  } catch (e) {
    yield put(failure(e));
  } finally {
    yield put(fulfill());
  }
}

export function* loginWatcher() {
  yield takeLatest(login.TRIGGER, loginWorker);
}

export function* logoutWatcher() {
  yield takeLatest(logout.TRIGGER, logoutWorker);
}
