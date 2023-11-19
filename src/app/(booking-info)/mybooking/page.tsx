import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getBookings from "@/libs/getBookings"
import getUserProfile from "@/libs/getUserProfile"
import { getServerSession } from "next-auth"
import { BookingResponse } from "../../../../interfaces"
import BookingDetail from "@/components/BookingDetail"

export default async function MyBooking() {
  const session = await getServerSession(authOptions)
  const profile = session?.user ? await getUserProfile(session?.user.token!) : null;
  const bookings = session?.user ? await getBookings(session?.user.token) :  null;
  console.log({ bookings })
  const isAdmin = profile?.data.role === 'admin'
  const bookingsData = bookings.data
  
  return (
    <>
      <div className="text-center text-xl pb-4">My Booking</div>
      <div className="space-y-2">
        {bookingsData.map((booking: BookingResponse) =>  
          <BookingDetail key={booking._id} booking={booking} isAdmin={isAdmin}/>
        )}
      </div>
    </>
  )
}