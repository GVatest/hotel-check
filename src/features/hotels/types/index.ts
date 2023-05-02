export type SearchParams = {
  location: string;
  checkIn: string;
  checkOut: string;
  currency?: string;
  limit?: number;
  days: number;
};

export type HotelData = {
  hotelId: number;
  hotelName: string;
  stars: number;
  priceFrom: number;
};

export type ResponseData = {
  hotels: HotelData[];
} & Pick<SearchParams, "checkIn" | "location" | "days">;
