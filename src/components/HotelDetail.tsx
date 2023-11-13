import getHotels from "@/libs/getHotels"
import { HotelCard } from "./HotelCard"
import Link from "next/link"
import getHotel from "@/libs/getHotel";
import Image from "next/image";
import EditHotelForm from "./EditHotelForm";
import deleteHotel from "@/libs/deleteHotel";
import DeleteHotelForm from "./DeleteHotelForm";

function Detail({ hotelData, isAdmin, token }: { hotelData: any, isAdmin: boolean, token: string }) {
  if (isAdmin) {
    return <EditHotelForm token={token} hotelData={hotelData}/>
  }
  return (
    <div className="text-md mx-5 text-left">
    <div className="mb-5 text-lg">{hotelData.name}</div>
    <div>Address: {hotelData.address}</div>
    <div>District: {hotelData.district}</div>
    <div>Province: {hotelData.province}</div>
    <div>Postcode: {hotelData.postalcode}</div>
    <div>Tel: {hotelData.tel}</div>

  </div>
  )
}

export default async function HotelDetail({ id, isAdmin, token }: { id: string, isAdmin: boolean, token: string }) {
  const hotel = await getHotel(id);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Image src={hotel.data.picture} 
            alt='Hotel Picture'
            width={9} height={0} sizes="100vw"
            className="rounded-lg w-full bg-black"
          />
          {isAdmin && <DeleteHotelForm id={id} token={token}/>}

        </div>
        <Detail hotelData={hotel.data} isAdmin={isAdmin} token={token}/>
      </div>
    </>
  );
}