import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AddHotelForm from "@/components/AddHotelForm"
import HotelCatalog from "@/components/HotelCatalog"
import getUserProfile from "@/libs/getUserProfile"
import { getServerSession } from "next-auth"
import { Suspense } from "react"
import Loading from "../loading"

export default async function Hotels() {
  const session = await getServerSession(authOptions)
  const profile = session?.user ? await getUserProfile(session?.user.token!) : null;
  return (
    <>
      <Suspense fallback={<Loading/>}>
        <HotelCatalog />
      </Suspense>
      {profile?.data.role == "admin" && session?.user ? <AddHotelForm token={session?.user.token}/> : null }
    </>
  )
}