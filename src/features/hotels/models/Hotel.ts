import { HotelData } from "../types";

export type HotelModel = {
  isFavourite: boolean;
  checkIn: string;
} & HotelData;
