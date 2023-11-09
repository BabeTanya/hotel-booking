import HotelDetail from "@/components/HotelDetail"
import getHotel from "@/libs/getHotel"
import { Skeleton } from "@mui/material"
import { Suspense } from "react"

export default async function HotelDetailPage({ params }: { params: { id: string }}) {
  return (
    <>
      <Suspense fallback={<Skeleton variant="rectangular" height={270}/>}>
        <HotelDetail id={params.id} />
      </Suspense>
    </>
  )
}