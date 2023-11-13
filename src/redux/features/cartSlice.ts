import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { BookingItem } from "../../../interfaces"

type CartState = {
  bookingItem: BookingItem | null
}

const initialState: CartState = { bookingItem: null }

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      state.bookingItem = action.payload
    },
    removeBooking: (state) => {
      state.bookingItem = null
    }
  },
})

export const { addBooking, removeBooking } = cartSlice.actions
export default cartSlice.reducer