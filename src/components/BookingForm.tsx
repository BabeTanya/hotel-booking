'use client'
import { FormEvent, useEffect, useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BookingItem, Hotel } from '../../interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector  } from '@/redux/store';
import { useSession } from 'next-auth/react';
import { addBooking, removeBooking } from '@/redux/features/cartSlice';
import dayjs from 'dayjs';
import createBooking from '@/libs/createBooking';
import { sendEmail } from '@/libs/sendEmail';

export default function BookingForm({ hotels }: { hotels: Hotel[]}) {
  const bookingItemStorage = useAppSelector((state) => state.cartSlice.bookingItem)

  const [bookingDate, setBookingDate] = useState<any>(
    bookingItemStorage?.bookingDate ? dayjs(bookingItemStorage?.bookingDate) : null
  );
  const [checkoutDate, setCheckoutDate] = useState<any>(
    bookingItemStorage?.checkoutDate ? dayjs(bookingItemStorage?.checkoutDate) : null
  );
  const [hotelId, setHotelId] = useState<string>(bookingItemStorage?.hotelId || '');
  const [hotelName, setHotelName] = useState<string>('');

  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>()
  const [inClient, setInClient] = useState(false)
  
  useEffect(() => {
    setInClient(true);
  }, [])
  

  const handleHotelChange = (event: SelectChangeEvent<string>) => {
    setHotelId(event.target.value);
    const selectHotel = hotels.find((hotel) => hotel.id === event.target.value)
    setHotelName(selectHotel?.name!);
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (bookingDate && checkoutDate && hotelId) {
      const bookingItem: BookingItem = {
        bookingDate: dayjs(bookingDate).format('YYYY/MM/DD'),
        checkoutDate: dayjs(checkoutDate).format('YYYY/MM/DD'),
        hotelId,
      }
      const durationDay = dayjs(checkoutDate).diff(dayjs(bookingDate), 'day')
      if (dayjs(bookingDate).isBefore(dayjs(), 'day')) {
        alert('Booking date is before present day')
      } else if (durationDay <= 0) {
        alert('Cannot checkout before or equal booking date')
      } else if (durationDay > 3) {
        alert('Can book maximum 3 nights')
      } else {
        if (session) {
          const bookingResponse = await createBooking(
            hotelId,
            bookingItem.bookingDate,
            bookingItem.checkoutDate,
            dayjs().format('YYYY/MM/DD'),
            session.user?.token
          )
          alert('Create booking successfully! Confirmation email will be sent shortly')
          sendEmail({
            to: session?.user.email,
            hotelName: hotelName,
            customerName: session.user?.name,
            bookingDate: bookingItem.bookingDate,
            checkoutDate: bookingItem.checkoutDate,
            bookingId: bookingResponse.data._id
          })
          dispatch(removeBooking())
          setBookingDate('')
          setCheckoutDate('')
          setHotelId('')
        } else {
          dispatch(addBooking(bookingItem))
          alert('Your booking temporary save, Please register/signin before submit')
        }
      }
    } else {
      alert('Error, please specify all fields')
    }
  }

  return (
    <>
      <div className="font-bold text-center">Create Booking</div>
      <form className="w-[90%] lg:w-[60%] mx-auto" onSubmit={submitForm}>
          <div className='flex w-full gap-x-4'>
            <div className='w-full'>
              <div className="mt-6">Booking Date</div>
              {inClient && <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="bg-white w-full"
                  value={bookingDate}
                  onChange={(value) => setBookingDate(value)}
                  format='YYYY/MM/DD'
                />
              </LocalizationProvider>}
            </div>
            <div className='w-full'>
              <div className="mt-6">Checkout Date</div>
              {inClient && <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="bg-white w-full"
                  value={checkoutDate}
                  onChange={(value) => setCheckoutDate(value)}
                  format='YYYY/MM/DD'
                />
              </LocalizationProvider>}
            </div>
          </div>

        <div className="mt-4">Hotel</div>
        {inClient && <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={hotelId}
          label="Hotel"
          onChange={handleHotelChange}
          fullWidth
        >
           {hotels.map((hotel) => <MenuItem key={hotel.id} value={hotel.id}>{hotel.name}</MenuItem>)}
        </Select>}

        <div className="flex items-center my-2 mt-8">
          {/* <label className="w-36 block text-gray-700 pr-4"></label> */}
          <button className="bg-blue-600 p-4 w-[200px] rounded mx-auto text-white">Submit</button>
        </div>
      </form>
    </>
  );
}