"use client"
import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function HotelCatalog(){
  const { data: session } = useSession();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (session) {
      getUserProfile(session?.user.token).then((profile) => setProfile(profile.data));
    }
  }, [session])
  return <>Hotel Catalog {JSON.stringify(profile)}</>
}