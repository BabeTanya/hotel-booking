'use client'
import { FormEvent, useDeferredValue, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BookingItem, BookingResponse, Hotel } from '../../interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector  } from '@/redux/store';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';
import updateBooking from '@/libs/updateBooking';

export default function EditBookingForm({ booking, isAdmin }: { booking: BookingResponse, isAdmin: boolean }) {
  const router = useRouter()

  const [bookingDate, setBookingDate] = useState<any>(dayjs(booking?.bookingDate) || dayjs().format('YYYY/MM/DD'));
  const [checkoutDate, setCheckoutDate] = useState<any>(dayjs(booking?.checkoutDate) || dayjs().format('YYYY/MM/DD'));
  
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>()
  const [inClient, setInClient] = useState(false)
  useEffect(() => {
    setInClient(true);
  }, [])
  

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (bookingDate && checkoutDate) {
      const durationDay = dayjs(checkoutDate).diff(dayjs(bookingDate), 'day')
      if (durationDay <= 0) {
        alert('Cannot checkout before or equal booking date')
      } else if (durationDay > 3) {
        alert('Can book maximum 3 nights')
      } else {
        if (session) {
          await updateBooking(
            booking._id,
            dayjs(bookingDate).format('YYYY/MM/DD'),
            dayjs(checkoutDate).format('YYYY/MM/DD'),
            dayjs().format('YYYY/MM/DD'),
            session.user?.token
          )
          alert('Update booking successfully!')
        } else {
          alert('Your booking temporary save, Please register/signin before submit')
        }
      }
    } else {
      alert('Error, please specify all fields')
    }
  }

  return (
    <>
      <div className="font-bold text-center">Edit Booking</div>
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
        <div className='text-md font-semibold'>{booking.hotel?.name}</div>

        {isAdmin && (
          <>
            <div className="mt-4">Customer</div>
            <div className='text-md font-semibold'>{booking.user?.name}</div>
          </>
        )}

        <div className="flex items-center my-2 mt-8">
          {/* <label className="w-36 block text-gray-700 pr-4"></label> */}
          <button className="bg-blue-600 p-4 w-[200px] rounded mx-auto text-white">Update</button>
        </div>
      </form>
    </>
  );
}