import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import HotelDetail from "@/components/HotelDetail"
import getHotel from "@/libs/getHotel"
import getUserProfile from "@/libs/getUserProfile"
import { Skeleton } from "@mui/material"
import { getServerSession } from "next-auth"
import { Suspense } from "react"

export default async function HotelDetailPage({ params }: { params: { id: string }}) {
  const session = await getServerSession(authOptions)
  const profile = session?.user ? await getUserProfile(session?.user.token!) : null;
  const isAdmin = profile?.data.role === 'admin';
  return (
    <>
      <Suspense fallback={<Skeleton variant="rectangular" height={270}/>}>
        <HotelDetail id={params.id} isAdmin={isAdmin} token={session?.user.token!}/>
      </Suspense>
    </>
  )
}