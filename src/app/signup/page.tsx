'use client'
import registerUser from '@/libs/registerUser';
import { FormEvent } from 'react';
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter()
  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get("name");
    const tel = formData.get("tel");
    const email = formData.get("email");
    const password = formData.get("password");
    await registerUser(name, email, tel, password, 'user');
    console.log({ name })
    router.push('/')
  }

  return (
    <>
      <div className="font-bold text-center">Register User</div>
      <form className="w-[80%] mx-auto" onSubmit={submitForm}>
        <div className="flex items-center my-2">
          <label className="w-36 block text-gray-700 pr-4" htmlFor="name">Name</label>
          <input type="text" required id="name" name="name" placeholder="Name"
              className="bg-white border-2 border-gray-200 rounded w-full p-2
              text-gray-700 focus:outline-none focus:border-blue-4--"/>
        </div>
        <div className="flex items-center my-2">
          <label className="w-36 block text-gray-700 pr-4" htmlFor="tel">Telephone</label>
          <input type="text" required id="tel" name="tel" placeholder="Telephone"
              className="bg-white border-2 border-gray-200 rounded w-full p-2
              text-gray-700 focus:outline-none focus:border-blue-4--"/>
        </div>
        <div className="flex items-center my-2">
          <label className="w-36 block text-gray-700 pr-4" htmlFor="email">Email</label>
          <input type="email" required id="email" name="email" placeholder="Email"
              className="bg-white border-2 border-gray-200 rounded w-full p-2
              text-gray-700 focus:outline-none focus:border-blue-4--"/>
        </div>
        <div className="flex items-center my-2">
          <label className="w-36 block text-gray-700 pr-4" htmlFor="password">Password</label>
          <input type="password" required id="password" name="password" placeholder="Password"
              className="bg-white border-2 border-gray-200 rounded w-full p-2
              text-gray-700 focus:outline-none focus:border-blue-4--"/>
        </div>
        <div className="flex items-center my-2">
          {/* <label className="w-36 block text-gray-700 pr-4"></label> */}
          <button className="bg-blue-600 p-4 rounded mx-auto text-white">Submit</button>
        </div>
      </form>
    </>
  );
}