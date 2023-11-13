import registerUser from '@/libs/registerUser';
import { FormEvent, Suspense, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import getHotels from '@/libs/getHotels';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BookingSection from '@/components/BookingSection';
import Loading from '../loading';
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