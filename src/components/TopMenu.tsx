import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TopMenuItem from "./TopMenuItem";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="w-full h-[60px] border-y border-gray-200 px-2 sm:px-48">
        <div className="w-full relative flex h-full justify-between">
          <div className="flex">
            <Link href='/'>
              <Image 
                src={'/images/logo.png'}
                className="h-full w-auto"
                alt='logo'
                width={0}
                height={0}
                sizes="100vh"
              />
            </Link>
            <TopMenuItem title='Booking' pageRef='/booking'/>
          </div>
          <div className="flex">
            {session && <TopMenuItem title='My Booking' pageRef='/mybooking'/>}
            {
              session ? 
                  <Link href='/api/auth/signout'>
                    <div className="flex items-center right-0 h-full px-2">
                      Sign Out of {session.user?.name}
                    </div>
                  </Link> 
                : 
                  <div className="flex items-center right-0 h-full px-2 space-x-2">
                    <Link href='/signup'>
                      <div className="">
                        Sign Up
                      </div>
                    </Link>
                    <div>|</div>
                    <Link href='/api/auth/signin'>
                      <div className="">
                        Sign In
                      </div>
                    </Link>
                  </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}