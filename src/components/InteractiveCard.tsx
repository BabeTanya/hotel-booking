"use client";
import React from "react";

export function InteractiveCard({ children }: { children: React.ReactNode }) {
  function onCardMouseAction(event: React.SyntheticEvent) {
    if (event.type == "mouseover") {
      event.currentTarget.classList.remove("bg-white");
      event.currentTarget.classList.remove("shadow-lg");
      event.currentTarget.classList.add("bg-neutral-200");
      event.currentTarget.classList.add("shadow-2xl");
    } else {
      event.currentTarget.classList.remove("bg-neutral-200");
      event.currentTarget.classList.remove("shadow-2xl");
      event.currentTarget.classList.add("bg-white");
      event.currentTarget.classList.add("shadow-lg");
    }
  }
  return (
    <div
      className="w-full h-[300px] rounded-lg shadow-lg"
      onMouseOver={(e) => onCardMouseAction(e)}
      onMouseOut={(e) => onCardMouseAction(e)}
    >
      {children}
    </div>
  );
}