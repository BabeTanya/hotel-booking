import getHotels from "@/libs/getHotels"
import { HotelCard } from "./HotelCard"
import Link from "next/link"
import getHotel from "@/libs/getHotel";
import Image from "next/image";

export default async function HotelDetail({ id }: { id: string }) {
  const hotel = await getHotel(id);
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Image src={hotel.data.picture} 
          alt='Hotel Picture'
          width={9} height={0} sizes="100vw"
          className="rounded-lg w-full bg-black"
        />
        <div className="text-md mx-5 text-left">
          <div className="mb-5 text-lg">{hotel.data.name}</div>
          <div>Address: {hotel.data.address}</div>
          <div>District: {hotel.data.district}</div>
          <div>Province: {hotel.data.province}</div>
          <div>Postcode: {hotel.data.postalcode}</div>
          <div>Tel: {hotel.data.tel}</div>

        </div>
      </div>
    </>
  );
}