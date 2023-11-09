import Image from "next/image";
import { InteractiveCard } from "./InteractiveCard";

export function HotelCard({ imageUrl, hotelName }: { imageUrl: string, hotelName: string }) {
  return (
    <>
      <InteractiveCard>
        <div className="w-full h-[70%] relative rounded-t-lg">
          <Image
            src={imageUrl}
            alt="bannerImage"
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <div className="w-full h-[15%] p-[10px]">
          <h4>{hotelName}</h4>
        </div>
      </InteractiveCard>
    </>
  )
}