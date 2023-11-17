import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getBookings from "@/libs/getBookings"
import getHotels from "@/libs/getHotels"
import getUserProfile from "@/libs/getUserProfile"
import dayjs from "dayjs"
import { getServerSession } from "next-auth"
import { BookingResponse } from "../../../../interfaces"
import BookingDetail from "@/components/BookingDetail"

export default async function MyBooking() {
  const session = await getServerSession(authOptions)
  const profile = session?.user ? await getUserProfile(session?.user.token!) : null;
  const bookings = session?.user ? await getBookings(session?.user.token) :  null;
  console.log({ bookings })
  const isAdmin = profile?.data.role === 'admin'
  let bookingsData = []
  if (isAdmin) {
    bookingsData = bookings.data;
  } else {
    console.log('bookings.data', bookings.data)
    console.log('session?.user._id', session?.user._id)
    bookingsData = bookings.data.filter((booking: any) => booking.user === session?.user._id);
  }
  // console.log('profile?.data', profile?.data)
  // console.log({ isAdmin })
  // console.log('bookings.data', bookings.data)
  // console.log('session?.user?._id', session?.user?._id);
  // const bookingsData = isAdmin ? 
  //   bookings.data : 
  //   bookings.data.filter((booking: any) => {
  //     console.log('1 -> ', booking?.user)
  //     console.log('2 -> ', session?.user?._id)
  //     return booking?.user?._id === session?.user?._id
  //   })
  // console.log({ bookingsData })
  const handleCancelBooking = () => {

  }
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