import { Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div><Skeleton variant="rectangular" height={270}/></div>
        <div><Skeleton variant="rectangular" height={270}/></div>
        <div><Skeleton variant="rectangular" height={270}/></div>
      </div>
    </>
  )
}