import { Suspense } from 'react';
import getHotels from '@/libs/getHotels';
import BookingForm from '@/components/BookingForm';


export default async function Booking() {
  const hotels = await getHotels()

  return (
    <>
      <Suspense>
        <BookingForm hotels={hotels.data}/>
      </Suspense>
    </>
  );
}