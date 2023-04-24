import { call, put, takeEvery } from "redux-saga/effects";
import { search } from "./slice";
import { HotelModel } from "../models";
import { hotelsApi } from "../api";
import { PayloadAction } from "@reduxjs/toolkit";
import { SearchParams } from "../types";

function* searchHotelsWorker(
  action: PayloadAction<SearchParams & { days: number }>
) {
  const { request, success, failure, fulfill } = search;
  yield request();
  try {
    const hotels: HotelModel[] = yield call(hotelsApi.search, action.payload);
    yield put(
      success({
        hotels,
        location: action.payload.location,
        checkIn: action.payload.checkIn,
        days: action.payload.days,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(failure());
  } finally {
    yield put(fulfill());
  }
}

export function* searchHotelsWatcher() {
  yield takeEvery(search.TRIGGER, searchHotelsWorker);
}
