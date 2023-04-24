import { api } from "shared";
import { HotelData, SearchParams } from "../types";

export const hotelsApi = {
  search: async ({
    location,
    checkIn,
    checkOut,
    limit = 10,
    currency = "rub",
  }: SearchParams) => {
    const response = await api.request<HotelData[]>({
      url: "",
      params: {
        location,
        currency,
        checkIn,
        checkOut,
        limit,
      },
      method: "GET",
    });

    return response.data;
  },
};
