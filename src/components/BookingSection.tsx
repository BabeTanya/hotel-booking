"use client"
import getHotels from "@/libs/getHotels"
import BookingForm from "./BookingForm"

export default function BookingSection({ hotels }: { hotels: any}) {
  return <BookingForm hotels={hotels}/>
}