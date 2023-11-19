import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditBookingForm from "@/components/EditBookingForm";
import getBooking from "@/libs/getBooking";
import getHotels from "@/libs/getHotels";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";

export default async function EditBooking({ params }: { params: { id: string }}) {
  const session = await getServerSession(authOptions)
  const profile = session?.user ? await getUserProfile(session.user?.token) : null
  const isAdmin = profile.data?.role === 'admin';
  const booking = session?.user ? await getBooking(params.id, session.user?.token!) : null
  console.log('booking', booking);
  return (
    <>
      <EditBookingForm booking={booking.data} isAdmin={isAdmin}/>
    </>
  )
}