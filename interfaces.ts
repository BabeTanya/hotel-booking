export interface Hotel {
  id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
}

export interface BookingItem {
  bookingDate: string;
  checkoutDate: string;
  hotelId: string;
}