'use client'
import deleteHotel from "@/libs/deleteHotel";
import { useRouter } from "next/navigation";

export default function DeleteHotelForm({id, token }: { id: string, token: string }) {
  const router = useRouter()
  const handleDeleteHotel = async (id: string) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      await deleteHotel(id, token);
      alert('Successfully delete hotel')
      window.location.href = '/hotels'
    }
  }
  
  return (
    <>
      <div className="w-full text-center	mt-16">
        <button onClick={() => handleDeleteHotel(id)} className="bg-red-600 p-4 w-[200px] rounded mx-auto text-white">Delete</button>
      </div>
    </>
  )
}