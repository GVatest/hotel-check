import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createRoutine } from "redux-saga-routines";
import { HotelModel } from "../models";
import moment from "moment";
import { HotelData, SearchParams } from "../types";

const slicePrefix = "hotels";

type HotelsStateType = {
  all: HotelModel[];
  favourites: HotelModel[];
  isLoading: boolean;
  location: string;
  checkIn: string;
  days: number;
  error?: string;
};

const initialState: HotelsStateType = {
  all: [],
  favourites: [],
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
    toggleFavourite: (state, { payload }: PayloadAction<HotelModel>) => {
      const favouritesFiltered = state.favourites.filter(
        (hotel) => hotel.hotelId !== payload.hotelId
      );
      console.log(favouritesFiltered);
      if (favouritesFiltered.length === state.favourites.length) {
        state.favourites.unshift({ ...payload, isFavourite: true });
      } else {
        state.favourites = favouritesFiltered;
      }

      state.all.map((hotel) => {
        hotel.hotelId === payload.hotelId
          ? (hotel.isFavourite = !hotel.isFavourite)
          : hotel;

        return hotel;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.REQUEST, (state) => {
        state.isLoading = true;
      })
      // can be speed up with usage of hashmap
      .addCase(
        search.SUCCESS,
        (state, { payload }: PayloadAction<SearchData>) => {
          const hotelsFormated = payload.hotels.map((hotel) => ({
            ...hotel,
            isFavourite: state.favourites.find(
              (hotelFav) => hotelFav.hotelId === hotel.hotelId
            )
              ? true
              : false,
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

export const selectAllHotels = (state: RootState) => state.hotels.all;
export const selectFavourites = (state: RootState) => state.hotels.favourites;
export const selectFavouritesCount = (state: RootState) =>
  state.hotels.favourites.length;
export const selectSearchParams = (state: RootState) => ({
  location: state.hotels.location,
  checkIn: state.hotels.checkIn,
  days: state.hotels.days,
});

export const { toggleFavourite } = hotelsSlice.actions;

export default hotelsSlice.reducer;
