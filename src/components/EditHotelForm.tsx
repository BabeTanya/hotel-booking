"use client"
import updateHotel from "@/libs/updateHotel";
import { TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function EditHotelForm({ hotelData, token }: { hotelData: any, token: string }) {
  const [name, setName] = useState<string>(hotelData.name);
  const [address, setAddress] = useState<string>(hotelData.address);
  const [district, setDistrict] = useState<string>(hotelData.district);
  const [province, setProvince] = useState<string>(hotelData.province);
  const [postalcode, setPostalCode] = useState<string>(hotelData.postalcode);
  const [tel, setTel] = useState<string>(hotelData.tel);
  const [picture, setPicture] = useState<string>(hotelData.picture);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name && address && district && province && postalcode && tel && picture) {
      const response = await updateHotel(hotelData.id, name, address, district, province, postalcode, tel, picture, token)
      const updatedHotel = response.data;
      alert('Successfully updated hotel')
      setName(updatedHotel.name)
      setAddress(updatedHotel.address)
      setDistrict(updatedHotel.district)
      setProvince(updatedHotel.province)
      setPostalCode(updatedHotel.postalcode)
      setTel(updatedHotel.tel)
      setPicture(updatedHotel.picture)
    } else {
      alert("Error, please specify all fields")
    }
  }

  return (
    <>
      <div>
      <div className="font-bold text-center ">Edit Hotel</div>
      <form className="w-[90%] mx-auto" onSubmit={onSubmit}>
        <div className="mt-4">Name</div>
        <TextField id="name" label="" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} />

        <div className="mt-4">Address</div>
        <TextField id="address" label="" variant="outlined" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />

        <div className="mt-4">District</div>
        <TextField id="district" label="" variant="outlined" fullWidth value={district} onChange={(e) => setDistrict(e.target.value)} />

        <div className="mt-4">Province</div>
        <TextField id="province" label="" variant="outlined" fullWidth value={province} onChange={(e) => setProvince(e.target.value)} />

        <div className="mt-4">Postalcode</div>
        <TextField id="postalcode" label="" variant="outlined" fullWidth value={postalcode} onChange={(e) => setPostalCode(e.target.value)} />

        <div className="mt-4">Telephone</div>
        <TextField id="tel" label="" variant="outlined" fullWidth value={tel} onChange={(e) => setTel(e.target.value)} />

        <div className="mt-4">Picture</div>
        <TextField id="picture" label="" variant="outlined" fullWidth value={picture} onChange={(e) => setPicture(e.target.value)} />

        <div className="flex items-center my-2 mt-8">
          {/* <label className="w-36 block text-gray-700 pr-4"></label> */}
          <button className="bg-blue-600 p-4 w-[200px] rounded mx-auto text-white">Submit</button>
        </div>
      </form>
      </div>
    </>
  )
}