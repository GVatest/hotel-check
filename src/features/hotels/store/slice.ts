import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createRoutine } from "redux-saga-routines";
import { HotelModel } from "../models";
import moment from "moment";
import { HotelData, SearchParams } from "../types";

const slicePrefix = "hotels";

type HotelsStateType = {
  all: HotelModel[];
  isLoading: boolean;
  location: string;
  checkIn: string;
  days: number;
  error?: string;
};

const initialState: HotelsStateType = {
  all: [],
  isLoading: false,
  location: "Москва",
  checkIn: moment().format("YYYY-MM-DD"),
  days: 1,
};

type SearchData = {
  hotels: HotelData[];
} & Pick<HotelModel, "checkIn" | "days"> &
  Pick<HotelsStateType, "location">;

const payloadCreator = {
  trigger: (payload: SearchParams & Pick<SearchData, "days">) => payload,
  success: (payload: SearchData) => payload,
  request: () => ({}),
  fulfill: () => ({}),
};

export const search = createRoutine(`${slicePrefix}/search`, payloadCreator);

const hotelsSlice = createSlice({
  name: slicePrefix,
  initialState: initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<HotelModel>) => {
      state.all = state.all.map((elem) =>
        elem.hotelId === action.payload.hotelId
          ? { ...elem, isFavourite: !action.payload.isFavourite }
          : elem
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(
        search.SUCCESS,
        (state, { payload }: PayloadAction<SearchData>) => {
          const hotelsFormated = payload.hotels.map((hotel) => ({
            ...hotel,
            isFavourite: false,
            checkIn: state.checkIn,
            days: state.days,
          }));
          state.all = hotelsFormated;
          state.location = payload.location;
          state.checkIn = payload.checkIn;
          state.days = payload.days;

          state.isLoading = false;
        }
      )
      .addCase(search.FULFILL, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectFavouriteHotels = (state: RootState) =>
  state.hotels.all.filter((hotel) => hotel.isFavourite === true);
export const selectFavouriteHotelsCount = (state: RootState) =>
  state.hotels.all.filter((hotel) => hotel.isFavourite === true).length;
export const selectAllHotels = (state: RootState) => state.hotels.all;
export const selectSearchParams = (state: RootState) => ({
  location: state.hotels.location,
  checkIn: state.hotels.checkIn,
  days: state.hotels.days,
});

export const { toggleFavourite } = hotelsSlice.actions;

export default hotelsSlice.reducer;
