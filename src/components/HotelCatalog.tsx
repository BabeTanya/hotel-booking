import getHotels from "@/libs/getHotels"
import { HotelCard } from "./HotelCard"
import Link from "next/link"
import { Hotel } from "../../interfaces"

export default async function HotelCatalog() {
  const hotels = await getHotels()
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {
        hotels.data.map((hotel: Hotel) => (
          <Link key={hotel.name} href={`/hotels/${hotel.id}`}>
            <HotelCard key={hotel.name} imageUrl={hotel.picture} hotelName={hotel.name} />
          </Link>
        ))
      }
    </div>
    </>
  )
}