"use client"
import dayjs from "dayjs";
import { BookingResponse } from "../../interfaces";
import Link from "next/link";
import deleteBooking from "@/libs/deleteBooking";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function BookingDetail({ booking, isAdmin }: { booking: BookingResponse, isAdmin: boolean }) {
  
  const { data: session } = useSession()
  const handleCancelBooking = async () => {
    if (window.confirm('Are you sure you wish to delete this item?') && session) {
      await deleteBooking(booking._id, session.user?.token);
      alert('Successfully delete booking')
      window.location.href = "/mybooking"
    }
  }
  return (
    <>
      <div className="border rounded p-4">
      <div>{booking?.hotel.name}</div>
      <div>Booking Date: {dayjs(booking.bookingDate).format('YYYY/MM/DD')}</div>
      <div>Checkout Date: {dayjs(booking.checkoutDate).format('YYYY/MM/DD')}</div>
      { isAdmin && <div>Customer: {booking.user?.name}</div>}
      <div className="flex space-x-2 mt-4">
        <Link href={`/booking/${booking._id}`}
          className="block rounded-md bg-sky-600 hover:bg-sky-800 px-3 py-2 text-white shadow-sm w-[120px] text-center">
          แก้ไข
        </Link>
        <button 
          className="block rounded-md bg-red-600 hover:bg-red-800 px-3 py-2 text-white shadow-sm w-[120px]"
          onClick={handleCancelBooking}>
          ยกเลิกการจอง
        </button>
      </div>
    </div>
    </>
  )
}