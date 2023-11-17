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

export interface BookingResponse {
  _id: string;
  bookingDate: string;
  checkoutDate: string;
  user: {
    _id: string;
    name: string;
    email: string;
    tel: string;
  },
  hotel: {
    _id: string;
    name: string;
    address: string;
    tel: string;
    id: string;
  }
  createdAt: string;
}