export type SearchParams = {
  location: string;
  checkIn: string;
  checkOut: string;
  currency?: string,
  limit?: number;
};

export type HotelData = {
  hotelId: number;
  hotelName: string;
  stars: number;
  priceFrom: number;
};