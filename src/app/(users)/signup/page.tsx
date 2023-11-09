'use client'
import registerUser from '@/libs/registerUser';
import { FormEvent, useState } from 'react';
import { useRouter } from "next/navigation";
import { MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

export default function Signup() {
  const router = useRouter()
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [tel, setTel] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [role, setRole] = useState<string>('user');

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    console.log('handleRoleChange e', event.target.value)
    setRole(event.target.value);
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name && email && tel && password && role) {
      await registerUser(name, email, tel, password, role);
      alert(`Successfully create ${role}`)
      setName('')
      setEmail('')
      setTel('')
      setPassword('')
      setRole('user')
    } else {
      alert('Error, please specify all fields')
    }
  }

  return (
    <>
      <div className="font-bold text-center">Register User</div>
      <form className="w-[90%] lg:w-[60%] mx-auto" onSubmit={submitForm}>
        <div className="mt-4">Name</div>
        <TextField id="name" label="" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} />

        <div className="mt-4">Telephone</div>
        <TextField id="tel" label="" variant="outlined" fullWidth value={tel} onChange={(e) => setTel(e.target.value)} />

        <div className="mt-4">Email</div>
        <TextField id="email" label="" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />

        <div className="mt-4">Password</div>
        <TextField id="password" type="password" label="" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />

        <div className="mt-4">Role</div>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Age"
          onChange={handleRoleChange}
          fullWidth
        >
          <MenuItem value={"admin"}>Admin</MenuItem>
          <MenuItem value={"user"}>User</MenuItem>
        </Select>

        <div className="flex items-center my-2 mt-8">
          {/* <label className="w-36 block text-gray-700 pr-4"></label> */}
          <button className="bg-blue-600 p-4 w-[200px] rounded mx-auto text-white">Submit</button>
        </div>
      </form>
    </>
  );
}