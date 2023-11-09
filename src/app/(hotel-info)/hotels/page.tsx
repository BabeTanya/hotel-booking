import HotelCatalog from "@/components/HotelCatalog"
import getHotels from "@/libs/getHotels"
import { LinearProgress, Skeleton } from "@mui/material"
import { Suspense } from "react"


const Loading = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div><Skeleton variant="rectangular" height={270}/></div>
        <div><Skeleton variant="rectangular" height={270}/></div>
        <div><Skeleton variant="rectangular" height={270}/></div>
        <div><Skeleton variant="rectangular" height={270}/></div>
      </div>
    </>
  )
}

export default function Hotels() {
  return (
    <>
      <Suspense fallback={<Loading/>}>
        <HotelCatalog />
      </Suspense>
    </>
  )
}