'use client'

import { useState } from "react";
import { useWindowListener } from "@/hooks/useWindowListener";
import { VideoPlayer } from "./VideoPlayer";

export function PromoteCard() {
  const [playing, setPlaying] = useState(true);

  // useWindowListener('contextmenu', (e) => e.preventDefault());

  return (
    <div className="w-[80%] shadow-lg mx-[10%] my-10 p-2 rounded-lg bg-gray-200 flex flex-row top-[500px]">
      <VideoPlayer isPlaying={playing} vdoSrc="/videos/hotel.webm"></VideoPlayer>
      <div className="m-5">
        Book Hotel
        <button 
          className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm w-20"
          onClick={() => setPlaying(!playing)}>
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  )
}